import { cx } from 'class-variance-authority'
import { useEffect, useState } from 'react'

const loadingPhrases = [
  'Carregando suas consultas',
  'Organizando seu ambiente',
  'Sincronizando informações',
  'Preparando sua experiência',
  'Verificando sua assinatura',
]

export const LoadingPage = () => {
  const [completedAnimation] = useState(false)
  const [currentPhrase, setCurrentPhrase] = useState(loadingPhrases[0])
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true)
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * loadingPhrases.length)
        setCurrentPhrase(loadingPhrases[randomIndex])
        setAnimate(false)
      }, 500) // duration of fade out
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center">
      <div className="flex items-center gap-2">
        {!completedAnimation && (
          <div className="h-3 w-3 bg-violet-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        )}
        <div
          className={cx(
            `bg-violet-500 rounded-full`,
            completedAnimation
              ? 'rounded-none transition-all w-screen h-screen  opacity-0 [transition-duration:1s]'
              : 'h-3 w-3 animate-bounce [animation-delay:-0.15s]',
          )}
        ></div>
        {!completedAnimation && (
          <div className="h-3 w-3 bg-violet-500 rounded-full animate-bounce"></div>
        )}
      </div>
      {!completedAnimation && (
        <p
          className={cx(
            'font-semibold text-lg text-zinc-800 transition-opacity duration-500',
            animate ? 'opacity-0' : 'opacity-100',
          )}
        >
          {currentPhrase}
        </p>
      )}
    </div>
  )
}
