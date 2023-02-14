import { useCallback, useEffect } from 'react'

// TODO - add types for observer

export const useGetRefCallback = (
  observer: any,
  callback: Function,
  dependencies: string[],
) =>
  useCallback(
    (node: JSX.Element) => {
      if (observer?.current) observer.current.disconnect()

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
