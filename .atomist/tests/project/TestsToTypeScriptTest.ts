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

Given("a file named .atomist/tests/Sample.rt for TestsToTypeScript converts sample test", p => {
    p.addFile(".atomist/tests/Sample.rt", `
scenario Jason Isbell
given Empty
when Something
then NoChange
`)
});

When("TestsToTypeScript for TestsToTypeScript converts sample test", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("TestsToTypeScript");

    psworld.editWith(editor, {});
});

Then("fileExists .atomist/tests/project/SampleTest.feature for TestsToTypeScript converts sample test", (p, world) => {

    return p.fileExists(".atomist/tests/project/SampleTest.feature");
});

Then("fileExists .atomist/tests/project/SampleTest.ts for TestsToTypeScript converts sample test", (p, world) => {

    return p.fileExists(".atomist/tests/project/SampleTest.ts");
});

Given("archive root for TestsToTypeScript converts archive tests", p => { p.copyEditorBackingFilesPreservingPath(""); });

When("TestsToTypeScript for TestsToTypeScript converts archive tests", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("TestsToTypeScript");

    psworld.editWith(editor, {});
});

Then("no change for TestsToTypeScript converts archive tests", (p, world) => {

    return !world.modificationsMade();
});
