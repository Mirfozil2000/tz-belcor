import type { CommandType } from "../types"

export const optimizeCommands = (commands: string): string => {
  if (!commands) return ""

  const commandArray = commands.split("")
  const optimized: string[] = []
  let i = 0

  while (i < commandArray.length) {
    const currentCommand = commandArray[i] as CommandType

    if (["Л", "П", "В", "Н"].includes(currentCommand)) {
      let count = 1
      while (i + count < commandArray.length && commandArray[i + count] === currentCommand) {
        count++
      }

      if (count > 1) {
        optimized.push(`${count}${currentCommand}`)
      } else {
        optimized.push(currentCommand)
      }

      i += count
    } else {
      optimized.push(currentCommand)
      i++
    }
  }

  return optimizeRepeatingPatterns(optimized.join(""))
}

const optimizeRepeatingPatterns = (commands: string): string => {
  const patterns: { [key: string]: number } = {}
  let result = commands

  for (let patternLength = 2; patternLength <= 6; patternLength++) {
    for (let i = 0; i <= commands.length - patternLength * 2; i++) {
      const pattern = commands.substring(i, i + patternLength)
      let count = 1
      let nextIndex = i + patternLength

      while (
        nextIndex + patternLength <= commands.length &&
        commands.substring(nextIndex, nextIndex + patternLength) === pattern
      ) {
        count++
        nextIndex += patternLength
      }

      if (count >= 2) {
        const replacement = `${count}(${pattern})`
        const originalSequence = pattern.repeat(count)
        result = result.replace(originalSequence, replacement)
      }
    }
  }

  return result
}
