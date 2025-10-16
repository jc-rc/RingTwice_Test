import { useOffboardingStore } from '../../stores/offboardingStore'
import Button from '../Form/Button'
import { useTranslation } from 'react-i18next'

interface OffboardingPerson {
  id: string
  name: string
  rating: number
  price: string
  avatar: string
  isPro?: boolean
}

const Offboarding = () => {
  const { currentStep, nextStep, completeOffboarding } = useOffboardingStore()
  const { t } = useTranslation()

  // Array of objects containing different people data
  const people: OffboardingPerson[] = [
    {
      id: '1',
      name: 'John Doe',
      rating: 4.5,
      price: '€25/hr',
      avatar: 'https://this-person-does-not-exist.com/img/avatar-gen6aecef13aa705225785b3aa146455339.jpg'
    },
    {
      id: '2',
      name: 'Patty Smith',
      isPro: true,
      rating: 4.8,
      price: '€30/hr',
      avatar: 'https://this-person-does-not-exist.com/img/avatar-genbbe012e68d277ddab74a95706d587f39.jpg'
    },
    {
      id: '3',
      name: 'Bill DeJong',
      rating: 4.2,
      price: '€22/hr',
      avatar: 'https://this-person-does-not-exist.com/img/avatar-gen840212179ed94ab7d009f6e6b9770fa7.jpg'
    }
  ]

  return (


    <div className=' relative flex-1 flex flex-col gap-8 p-8 overflow-hidden w-full md:w-xl mx-auto glassy md:rounded-4xl fadeIn '>


      <div>Header</div>
      <div className='flex-2'>
        {currentStep === 1 && <div className="flex items-center justify-center h-full border">
          IMAGE1
        </div>

        }
        {currentStep === 2 && <div className="flex flex-col gap-4 items-center justify-center h-full scale-80 md:scale-100 ">
          {people.map((person, index) => (
            <div key={person.id} className='flex flex-col gap-2 rounded-4xl p-6 py-4 glassy w-5/6 fadeInUp' style={{ animationDelay: `${index * 0.1}s` }}>
              <div className='flex items-center justify-between gap-4 '>
                {/* Avatar */}
                <div>
                  <div className="relative rounded-full size-20 border-8 border-pink-500/60 ">
                    <img src={person.avatar} alt={`${person.name} avatar`} className='inset-0 object-cover object-center w-full h-full rounded-full' />
                    {person.isPro && <div className='heartbeat absolute left-[50%] -translate-x-[50%] -translate-y-[25%] bg-blue-500 text-neutral-200 text-sm font-bold px-2 py-1 rounded-full'>PRO</div>}
                  </div>
                </div>
                {/* Name, rating and price */}
                <div className='flex flex-col flex-1'>
                  <p className='text-2xl font-bold'>{person.name}</p>
                  <p className='text-lg'>
                    <i className='fa-solid fa-star text-yellow-500 text-shadow-xs me-2'></i>
                    {person.rating}
                  </p>
                  
                </div>
              </div>
            </div>
          ))}
        </div>

        }
        {currentStep === 3 && <div className="flex items-center justify-center h-full ">
          <div className='relative bg-neutral-200 rounded-4xl shadow-lg p-4 aspect-square flex items-center justify-center w-32 md:scale-125 transition-all duration-300'>
              <img src="/RingTwice-symbol_logo-rgb.svg" alt="RingTwice Logo" className='w-10' />
              <div className='absolute top-0 translate-y-[-25%] right-[0] translate-x-[25%] bg-red-400 size-10 rounded-full flex items-center justify-center animate-ping'>
                
              </div>
              <div className='absolute top-0 translate-y-[-25%] right-[0] translate-x-[25%] bg-red-500 size-10 rounded-full flex items-center justify-center '>
                <i className='fa-solid fa-exclamation text-neutral-200 text-2xl'></i>
              </div>
          </div>
        </div>
        }
      </div>
      <div className='flex flex-col gap-2 justify-end flex-1'>
        <p className='text-4xl font-bold'>{t(`offboarding.title_step${currentStep}`)}</p>
        <p className='text-xl'>{t(`offboarding.paragraph_step${currentStep}`)}</p>
      </div>
      <div>
        <Button label={currentStep === 3 ? t(`offboarding.button_complete`) : t(`offboarding.button_step${currentStep}`)} className='bg-emerald-600 text-neutral-200 clickable fadeIn w-full' onClick={currentStep === 3 ? completeOffboarding : nextStep} />
      </div>
    </div>
  )
}

export default Offboarding