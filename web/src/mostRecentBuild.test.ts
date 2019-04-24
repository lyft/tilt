import mostRecentBuild, { ResourceWithBuilds } from "./mostRecentBuild"
import { zeroTime } from "./time"

it("returns null if there are no builds", () => {
  const resources: Array<ResourceWithBuilds> = []

  let actual = mostRecentBuild(resources)
  expect(actual).toBeNull()
})

it("returns the most recent build if there are no pending builds", () => {
  let recent = {
    Edits: null,
    Error: null,
    StartTime: "2019-04-24T13:08:41.017623-04:00",
    FinishTime: "2019-04-24T13:08:42.926608-04:00",
    Log: "",
  }
  let expectedTuple = {
    name: "snack",
    edits: [],
    since: recent.StartTime,
  }
  const resource: ResourceWithBuilds = {
    Name: "snack",
    BuildHistory: [
      {
        Edits: null,
        Error: null,
        StartTime: "2019-04-24T13:08:39.017623-04:00",
        FinishTime: "2019-04-24T13:08:40.926608-04:00",
        Log: "",
      },
      recent,
    ],
    PendingBuildEdits: null,
    PendingBuildSince: zeroTime,
  }
  const resources: Array<ResourceWithBuilds> = [resource]

  let actual = mostRecentBuild(resources)
  expect(actual).toEqual(expectedTuple)
})

it("returns the pending build if there is one", () => {
  let expectedTuple = {
    name: "snack",
    edits: ["bar"],
    since: "2019-04-24T13:08:41.017623-04:00",
  }
  const resource: ResourceWithBuilds = {
    Name: "snack",
    BuildHistory: [
      {
        Edits: null,
        Error: null,
        StartTime: "2019-04-24T13:08:39.017623-04:00",
        FinishTime: "2019-04-24T13:08:40.926608-04:00",
        Log: "",
      },
    ],
    PendingBuildEdits: ["bar"],
    PendingBuildSince: "2019-04-24T13:08:41.017623-04:00",
  }
  const resources = [resource]

  let actual = mostRecentBuild(resources)
  expect(actual).toEqual(expectedTuple)
})
