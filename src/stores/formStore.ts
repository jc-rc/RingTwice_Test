import { create } from 'zustand'

/**
 * Form Domain Types
 *
 * We define explicit types for every form field to keep the store self-documenting
 * and easy to extend. Prefer narrow unions for enums-like fields.
 */
export type CategoryName = string
export type SubCategoryName = string
export type SubActivityName = string
export type PlaceType = string

export interface CategoryNode {
	title: CategoryName
	subCategories?: Array<{
		title: SubCategoryName
		subActivities?: SubActivityName[]
	}>
}

/**
 * State shape for the entire form.
 */
export interface FormState {
	// Catalog data (fetched)
	categories: CategoryNode[]
	isCategoriesLoading: boolean
	categoriesError: string | null

	// User inputs
	category: CategoryName | null
	subCategory: SubCategoryName | null
	subActivities: Set<SubActivityName>
	description: string
	photos: File[]
	address: string
	placeType: PlaceType | null
	materialsProvided: boolean
	toolsProvided: boolean
	peopleNeeded: number | null
	extraDetails: string
	name: string
	phone: string
	email: string

	/**
	 * Derived validations (simple "not empty" style).
	 * These are recalculated on access; in Zustand, selectors at usage sites are fine.
	 * If you need heavy validation, consider memoization with a derived selector in the component.
	 */
	isBasicInfoValid: () => boolean
	canSubmit: () => boolean

	/** Actions */
	setCategory: (category: CategoryName | null) => void
	setSubCategory: (subCategory: SubCategoryName | null) => void
	toggleSubActivity: (name: SubActivityName) => void
	setDescription: (text: string) => void
	addPhotos: (files: File[]) => void
	removePhotoAt: (index: number) => void
	setAddress: (text: string) => void
	setPlaceType: (type: PlaceType | null) => void
	setMaterialsProvided: (value: boolean) => void
	setToolsProvided: (value: boolean) => void
	setPeopleNeeded: (value: number | null) => void
	setExtraDetails: (text: string) => void
	setName: (text: string) => void
	setPhone: (text: string) => void
	setEmail: (text: string) => void

	/** Async fake API */
	fetchCategories: () => Promise<void>
}

/**
 * Initial empty categories; the UI can render a loading spinner while
 * `isCategoriesLoading` is true and an error banner if `categoriesError` is set.
 */
const initialCategories: CategoryNode[] = []

export const useFormStore = create<FormState>((set, get) => ({
	// Catalog
	categories: initialCategories,
	isCategoriesLoading: false,
	categoriesError: null,

	// Inputs (initialize to sensible defaults for controlled inputs)
	category: null,
	subCategory: null,
	subActivities: new Set<SubActivityName>(),
	description: '',
	photos: [],
	address: '',
	placeType: null,
	materialsProvided: false,
	toolsProvided: false,
	peopleNeeded: null,
	extraDetails: '',
	name: '',
	phone: '',
	email: '',

	/**
	 * Very simple validations: adjust as your rules evolve.
	 * - Basic info requires category, description, and address
	 */
	isBasicInfoValid: () => {
		const { category, description, address } = get()
		const notEmpty = (v: string | null | undefined) => !!v && String(v).trim().length > 0
		return notEmpty(category) && notEmpty(description) && notEmpty(address)
	},
	canSubmit: () => {
		// Start minimal: canSubmit == isBasicInfoValid
		return get().isBasicInfoValid()
	},

	// Actions
	setCategory: (category) => set((state) => {
		// When changing category, clear dependent selections
		return {
			category,
			subCategory: null,
			subActivities: new Set<SubActivityName>(),
		}
	}),
	setSubCategory: (subCategory) => set(() => ({ subCategory })),
	toggleSubActivity: (name) => set((state) => {
		const next = new Set(state.subActivities)
		if (next.has(name)) next.delete(name)
		else next.add(name)
		return { subActivities: next }
	}),
	setDescription: (text) => set(() => ({ description: text })),
	addPhotos: (files) => set((state) => ({ photos: [...state.photos, ...files] })),
	removePhotoAt: (index) => set((state) => ({ photos: state.photos.filter((_, i) => i !== index) })),
	setAddress: (text) => set(() => ({ address: text })),
	setPlaceType: (type) => set(() => ({ placeType: type })),
	setMaterialsProvided: (value) => set(() => ({ materialsProvided: value })),
	setToolsProvided: (value) => set(() => ({ toolsProvided: value })),
	setPeopleNeeded: (value) => set(() => ({ peopleNeeded: value })),
	setExtraDetails: (text) => set(() => ({ extraDetails: text })),
	setName: (text) => set(() => ({ name: text })),
	setPhone: (text) => set(() => ({ phone: text })),
	setEmail: (text) => set(() => ({ email: text })),

	/**
	 * Fake async API to fetch categories. Replace with a real HTTP call later.
	 * This simulates latency and allows the UI to render loading/error states.
	 */
	fetchCategories: async () => {
		set({ isCategoriesLoading: true, categoriesError: null })
		try {
			// Simulate latency
			await new Promise((r) => setTimeout(r, 800))
			// Fake payload — mirrors your current inline structure
			const payload: CategoryNode[] = [
				{
					title: 'Gardening',
					subCategories: [
						{
							title: 'Watering',
							subActivities: ['Water potted plants', 'Water whole yard'],
						},
					],
				},
			]
			set({ categories: payload })
		} catch (e: unknown) {
			const message = e instanceof Error ? e.message : 'Unknown error'
			set({ categoriesError: message })
		} finally {
			set({ isCategoriesLoading: false })
		}
	},
}))

/**
 * Usage notes:
 * - Read state in components with: const { category } = useFormStore()
 * - Read derived booleans: const isValid = useFormStore((s) => s.isBasicInfoValid())
 * - Update fields with provided setters; prefer controlled inputs.
 * - Extend validations by either:
 *   a) Adding new boolean functions (e.g., isContactValid)
 *   b) Expanding canSubmit to AND multiple validators
 * - If you later normalize categories, keep IDs instead of titles for stability.
 */
