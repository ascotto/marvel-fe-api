import { useCallback } from 'react'

export const useGetRefCallback = (observer, callback, dependencies) =>
  useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            callback()
          }
        },
        { threshold: 0.5 },
      )
      if (node) observer.current.observe(node)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...dependencies],
  )
