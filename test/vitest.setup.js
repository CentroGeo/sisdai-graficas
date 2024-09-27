import { beforeEach, vi } from 'vitest'

beforeEach(() => {
  // Crear un mock para la propiedad `transform`
  const mockTransform = {
    baseVal: {
      consolidate: vi.fn(() => ({
        matrix: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
      })),
    },
  }

  // Envolver la propiedad existente o definirla si no existe
  if (
    !Object.prototype.hasOwnProperty.call(SVGElement.prototype, 'transform')
  ) {
    Object.defineProperty(SVGElement.prototype, 'transform', {
      configurable: true,
      enumerable: true,
      get() {
        return mockTransform
      },
    })
  } else {
    // Sobrescribir el getter existente si es necesario
    const originalDescriptor = Object.getOwnPropertyDescriptor(
      SVGElement.prototype,
      'transform'
    )
    Object.defineProperty(SVGElement.prototype, 'transform', {
      configurable: true,
      enumerable: true,
      get() {
        return mockTransform
      },
      set(value) {
        if (originalDescriptor && originalDescriptor.set) {
          originalDescriptor.set(value)
        }
      },
    })
  }
})
