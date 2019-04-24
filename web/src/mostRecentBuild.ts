import { Build } from "./types"
import { isZeroTime } from "./time"

export type ResourceWithBuilds = {
  Name: string
  BuildHistory: Array<Build>
  PendingBuildSince: string
  PendingBuildEdits: Array<string> | null
}

const buildByDate = (b1: BuildTuple, b2: BuildTuple) => {
  let b1Date = Date.parse(b1.since)
  let b2Date = Date.parse(b2.since)
  if (b1Date > b2Date) {
    return -1
  }
  if (b1Date < b2Date) {
    return 1
  }
  return 0
}

type BuildTuple = {
  name: string
  since: string
  edits: Array<string>
}

const makePendingBuild = (r: ResourceWithBuilds): BuildTuple => {
  return {
    name: r.Name,
    since: r.PendingBuildSince,
    edits: r.PendingBuildEdits ? r.PendingBuildEdits : [],
  }
}

const makeBuildHistory = (r: ResourceWithBuilds, b: Build): BuildTuple => {
  return {
    name: r.Name,
    since: b.StartTime,
    edits: b.Edits ? b.Edits : [],
  }
}

const mostRecentBuild = (
  resources: Array<ResourceWithBuilds>
): BuildTuple | null => {
  let r = null
  let pendingBuildsSorted = resources
    .map(r => makePendingBuild(r))
    .filter(b => !isZeroTime(b.since))
    .sort(buildByDate)

  if (pendingBuildsSorted.length > 0) {
    return pendingBuildsSorted[0]
  }

  let buildHistorySorted = resources
    .flatMap(r => r.BuildHistory.map(b => makeBuildHistory(r, b)))
    .sort(buildByDate)

  if (buildHistorySorted.length > 0) {
    return buildHistorySorted[0]
  }

  return r
}

export default mostRecentBuild
