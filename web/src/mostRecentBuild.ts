import { Build } from "./types"

export type ResourceWithBuilds = {
  Name: string
  BuildHistory: Array<Build>
  PendingBuildSince: string
  PendingBuildEdits: Array<string> | null
}

type BuildTuple = {
  name: string
  build: Build
}

const sortByDate = (b1: BuildTuple, b2: BuildTuple) => {
  let b1Date = Date.parse(b1.b.StartTime)
  let b2Date = Date.parse(b2.b.StartTime)
  if (b1Date > b2Date) {
    return -1
  }
  if (b1Date < b2Date) {
    return 1
  }
  return 0
}

const makebuildTuple = (r: ResourceWithBuilds, b: Build): BuildTuple => {
  return {
    name: r.Name,
    build: b,
  }
}

const mostRecentBuild = (
  resources: Array<ResourceWithBuilds>
): BuildTuple | null => {
  let r = null
  // TODO(dmiller): check for pending builds
  let allBuildsSorted = resources
    .flatMap(r => r.BuildHistory.map(b => makebuildTuple(r, b)))
    .sort(sortByDate)

  if (allBuildsSorted.length > 0) {
    return allBuildsSorted[0]
  }

  return r
}

export default mostRecentBuild
