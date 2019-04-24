import mostRecentBuild, { ResourceWithBuilds } from "./mostRecentBuild"

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
    PendingBuildEdits: ["main.go"],
    PendingBuildSince: "2019-04-24T13:10:41.317712-04:00",
  }
  const resources: Array<ResourceWithBuilds> = [resource]

  let actual = mostRecentBuild(resources)
  expect(actual).toBe(recent)
})
