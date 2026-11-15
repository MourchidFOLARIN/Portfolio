// Assemble des noms de classes en ignorant les valeurs vides
export const cx = (...classes) => classes.filter(Boolean).join(' ')
