# Notes from Nature Field Book

The Notes from Nature Field Book is intended to provide a dashboard for volunteers that participate in [Notes from Nature](https://www.notesfromnature.org).

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Usage

In the project directory, you can run:

### `npm install`

Installs the dependencies.

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

### `npm run stage`

Builds and deploys to https://field-book-preview.notesfromnature.org/, authenticating to "production" Panoptes.<br>

### `npm run deploy`

Builds and deploys to https://field-book.notesfromnature.org/, authenticating to "production" Panoptes.<br>

## Notes

Accepts query params: 
* `env=[ENV]`, where `ENV` = `production` or `staging`
* `project_id=[PROJECT_ID]`, where `PROJECT_ID` = desired project's ID, i.e. `1234`

## Badges

There are two types of badges, referred to as:
  1. [Stats badges](https://github.com/zooniverse/notes-from-nature-field-book/blob/master/src/badges/index.js#L317), based on [zoo-event-stats](https://github.com/zooniverse/zoo-event-stats) (i.e. 10 Classifications), 
  2. [Caesar badges](https://github.com/zooniverse/notes-from-nature-field-book/blob/master/src/badges/index.js#L64), based on [Caesar](https://github.com/zooniverse/caesar) and [nfn-faas](https://github.com/zooniverse/nfn-faas) (i.e. 80s, Night Owl, 10 Herbarium, etc.)

Stats badges require no additional configuration.
Caesar badges require the following project and workflow Caesar configurations:

### Project Caesar configuration for badges

1. From https://caesar.zooniverse.org/projects, if no Caesar project config exists then click the "+Add" button to create a new config, providing the project ID when prompted. Once the project config is added/created, or if it already exists, select it from the list.
2. From the Caesar project config, click the "Reducers" tab (i.e. https://caesar.zooniverse.org/projects/1558#reducers).
3. Create the following 4 Count Reducers by clicking "+Create" and select "Count" from the dropdown for each, with the noted options:
  * Decade
    1. key: `decade`
    2. topic: reduce_by_user
    3. field_name: `faas.decade`
    4. if_missing: ignore
    5. extractor keys: `["faas"]`
  * Earth Day
    1. key: `earth_day`
    2. topic: reduce_by_user
    3. field_name: `faas.earth_day`
    4. if_missing: ignore
    5. extractor keys: `["faas"]`
    6. repeated classifications: keep_first
  * Time
    1. key: `time`
    2. topic: reduce_by_user
    3. field_name: `faas.time`
    4. if_missing: ignore
    5. extractor keys: `["faas"]`
    6. repeated classifications: keep_first
  * Workflow
    1. key: `workflow_type`
    2. topic: reduce_by_user
    3. field_name: `faas.workflow`
    4. if_missing: ignore
    5. extractor keys: `["faas"]`

Note: use other Notes from Nature Caesar project configurations as additional examples, search https://caesar.zooniverse.org/projects for "Notes from Nature".

### Workflow Caesar configuration for badges

1. From https://caesar.zooniverse.org/workflows, if no Caesar workflow config exists then click the "+Add" button to create a new config, providing the workflow ID when prompted. Once the workflow config is added/created, or if it already exists, select it from the list.
2. From the Caesar workflow config, click the "Extractors" tab (i.e. https://caesar.zooniverse.org/workflows/10362#extractors), then click "+Create Extractor" and select "External" from the dropdown. The External Extractor settings are:
   * **Key**: `faas`
   * **Url**: variable per workflow, starts with `https://aggregation-caesar.zooniverse.org/extractors/nfn_extractor?`, then includes:
      1. (required) `workflow=[WORKFLOW_TYPE]`, `WORKFLOW_TYPE` options (choose one of) = `[aquatics, butterfly, fossils, herbarium, labs, macrofungi, magnified, pinned_specimen]`, as determined often by workflow name (usually prefixed) or contact researcher
      2. (optional, if relevant task) `year=[TASK_KEY FOR DROPDOWN TASK WITH 4-DIGIT YEAR]`, if multiple tasks for year, likely use first related task (key) with confirmation from researcher
      3. **_example_**: `https://aggregation-caesar.zooniverse.org/extractors/nfn_extractor?workflow=herbarium&year=T10`
3. Click "Create External extractor" to save extractor settings.

Note: use other Notes from Nature Caesar workflow configurations as additional examples, search https://caesar.zooniverse.org/workflows for "Notes from Nature" or by workflow type (i.e. "Herbarium").
