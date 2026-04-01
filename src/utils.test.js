import { findChangedIndex } from "./utils";

describe('findChangedIndex', () => {
    test('devuelve -1 si no hay cambios', () => {
        const prev = ['X', null, '0']
        const current = ['X', null, '0']
        expect(findChangedIndex(prev,current)).toBe(-1)
    }),
    test('devuelve indice del cambio', () => {
        const prev = ['X', null, '0', null]
        const current = ['X', null, '0','X']
        expect(findChangedIndex(prev,current)).toBe(3)
    })
})