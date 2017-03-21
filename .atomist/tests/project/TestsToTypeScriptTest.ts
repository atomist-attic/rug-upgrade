/*
 * Copyright © 2017 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Project } from "@atomist/rug/model/Project";
import { Given, When, Then, ProjectScenarioWorld } from "@atomist/rug/test/project/Core";

Given("a sample DSL test", p => {
    p.addFile(".atomist/tests/Sample.rt", `
scenario Jason Isbell
given Empty
when Something
then NoChange
`)
});

When("TestsToTypeScript edits the project", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("TestsToTypeScript");
    psworld.editWith(editor, {});
});

const featurePath = ".atomist/tests/project/SampleTest.feature";
const tsPath = ".atomist/tests/project/SampleTest.ts";

Then("the sample feature files exists", (p, world) => {
    return p.fileExists(featurePath);
});

Then("the sample feature file starts with an empty project", (p, world) => {
    return p.fileContains(featurePath, "Given an empty project");
});

Then("the sample feature file asserts no change", (p, world) => {
    return p.fileContains(featurePath, "Then no changes were made");
});

Then("the sample TypeScript test file exists", (p, world) => {
    return p.fileExists(tsPath);
});
