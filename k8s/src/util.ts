import merge from 'deepmerge'

/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-return */
export const mergeArrayByName: merge.Options['arrayMerge'] = (
  target,
  source,
  options,
): any[] => {
  const destination = target.slice()

  source.forEach((item, _index) => {
    const idx = destination.findIndex(
      (e) => e?.name !== undefined && e?.name && e?.name === item?.name,
    )
    if (idx === -1) {
      destination.push(item)
    } else if (options?.isMergeableObject!(item)) {
      destination[idx] = merge(destination[idx], item, options)
    }
  })
  return destination
}
/* eslint-enable */
