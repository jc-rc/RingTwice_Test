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

	// Form steps
	isFormComplete: boolean
	currentStep: number
	nextStep: () => void
	prevStep: () => void

	/** Derived validations */
	isBasicInfoValid: () => boolean
	canSubmit: () => boolean

	/** New per-step validations */
	isStep1Valid: () => boolean
	isStep2Valid: () => boolean
	isStep3Valid: () => boolean
	canGoNext: () => boolean

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

	// Inputs
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

	// Steps
	isFormComplete: false,
	currentStep: 1,
	nextStep: () => set((s) => ({ currentStep: Math.min(s.currentStep + 1, 4) })),
	prevStep: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 1) })),

	/**
	 * Very simple validations
	 */
	isBasicInfoValid: () => {
		const { category, description, address } = get()
		const notEmpty = (v: string | null | undefined) => !!v && String(v).trim().length > 0
		return notEmpty(category) && notEmpty(description) && notEmpty(address)
	},
	canSubmit: () => get().isBasicInfoValid(),

	/** Per-step validations */
	isStep1Valid: () => {
		const { category, subCategory, subActivities, description } = get()
		const hasSubActivities = subActivities.size > 0
		return !!category && !!subCategory && hasSubActivities && description.trim().length >= 20
	},
	isStep2Valid: () => {
		const { address, placeType, peopleNeeded } = get()
		const okPeople = typeof peopleNeeded === 'number' && !Number.isNaN(peopleNeeded)
		return address.trim().length > 0 && !!placeType && okPeople
	},
	isStep3Valid: () => {
		const { name, phone, email } = get()
		const basicEmail = /.+@.+\..+/
		return name.trim().length > 0 && (phone.trim().length > 0 || !/^[0-9]*$/.test(phone)) && basicEmail.test(email)
	},
	canGoNext: () => {
		switch (get().currentStep) {
			case 1: return get().isStep1Valid()
			case 2: return get().isStep2Valid()
			case 3: return get().isStep3Valid()
			default: return true
		}
	},

	// Actions
	setCategory: (category) => set(() => ({ category, subCategory: null, subActivities: new Set<SubActivityName>() })),
	setSubCategory: (subCategory) => set(() => ({ subCategory })),
	toggleSubActivity: (name) => set((state) => {
		const next = new Set(state.subActivities)
		if (next.has(name)) next.delete(name)
		else next.add(name)
		return { subActivities: next }
	}),
	setDescription: (text) => set(() => ({ description: text })),
	addPhotos: (files) => set(() => ({ photos: files })),
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

	/** Fake async API */
	fetchCategories: async () => {
		set({ isCategoriesLoading: true, categoriesError: null })
		try {
			await new Promise((r) => setTimeout(r, 800))
			const payload: CategoryNode[] = [
				{ title: 'Gardening', subCategories: [ { title: 'Watering', subActivities: ['Water potted plants', 'Water whole yard'] } ] },
				{ title: 'Entertainment', subCategories: [ { title: 'Music', subActivities: ['Hire a DJ', 'Set up speakers'] } ] },
				{ title: 'Pets', subCategories: [ { title: 'Walking', subActivities: ['Walk the dog', 'Pet sitting'] } ] },
				{ title: 'House chores', subCategories: [ { title: 'Cleaning', subActivities: ['Vacuuming', 'Mopping', 'Laundry'] } ] },
				{ title: 'Technology', subCategories: [ { title: 'IT Help', subActivities: ['Set up Wi‑Fi', 'Install software'] } ] },
				{ title: 'Transport', subCategories: [ { title: 'Moving', subActivities: ['Load van', 'Drive items'] } ] },
				{ title: 'Babysitting', subCategories: [ { title: 'Care', subActivities: ['Evening babysitting', 'School pickup'] } ] },
				{ title: 'Lessons', subCategories: [ { title: 'Tutoring', subActivities: ['Math help', 'Language practice'] } ] },
				{ title: 'Wellness', subCategories: [ { title: 'Fitness', subActivities: ['Personal training', 'Yoga session'] } ] },
				{ title: 'Handywork', subCategories: [ { title: 'Repairs', subActivities: ['Fix shelf', 'Assemble furniture'] } ] },
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
