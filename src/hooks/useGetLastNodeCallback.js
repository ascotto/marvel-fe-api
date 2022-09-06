import { useCallback } from 'react'

export const useGetLastNodeCallback = (observer, loading, callback) =>
  useCallback(
    (node) => {
      if (loading) return

      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log('end  of page')
          callback()
        }
      })
      if (node) observer.current.observe(node)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading],
  )
