// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useCount() {
  const count = useState('count', () => Math.round(Math.random() * 20))

  function inc(): void {
    count.value += 1
  }
  function dec(): void {
    count.value -= 1
  }

  return {
    count,
    inc,
    dec,
  }
}
