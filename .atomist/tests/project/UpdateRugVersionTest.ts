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

Given("a file named .atomist/manifest.yml for UpdateRugVersion should update the version in a manifest.yml", p => {
    p.addFile(".atomist/manifest.yml", `group: test-rugs
artifact: test-manifest
version: "0.1.0"
requires: "[0.6.0,1.0.0)"
dependencies:
extensions:
`)
});

When("UpdateRugVersion manifest_version is v, package_version is ~11.9.2 for UpdateRugVersion should update the version in a manifest.yml", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("UpdateRugVersion");
    let v = "7.4.3";
    psworld.editWith(editor, { manifest_version: v, package_version: "~11.9.2", v: "7.4.3" });
});

Then("fileContains atomist manifest yml requires v for UpdateRugVersion should update the version in a manifest yml", (p, world) => {
    let v = "7.4.3";
    return p.fileContains(".atomist/manifest.yml", 'requires: "' + v + '"');
});

Then("not result fileContains atomist manifest yml 0 6 0 for UpdateRugVersion should update the version in a manifest yml", (p, world) => {
    let v = "7.4.3";
    return !p.fileContains(".atomist/manifest.yml", "0.6.0");
});

Then("not result fileContains atomist manifest yml 11 9 2 for UpdateRugVersion should update the version in a manifest yml", (p, world) => {
    let v = "7.4.3";
    return !p.fileContains(".atomist/manifest.yml", "11.9.2");
});

Given("a file named .atomist/manifest.yml for UpdateRugVersion should update to version range in a manifest.yml", p => {
    p.addFile(".atomist/manifest.yml", `group: test-rugs
artifact: test-manifest
version: "0.1.0"
requires: "[0.6.0,1.0.0)"
dependencies:
extensions:
`)
});

When("UpdateRugVersion manifest_version is v, package_version is ~11.9.2 for UpdateRugVersion should update to version range in a manifest.yml", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("UpdateRugVersion");
    let v = "[7.4.3,13.11.2)";
    psworld.editWith(editor, { manifest_version: v, package_version: "~11.9.2", v: "[7.4.3,13.11.2)" });
});

Then("fileContains atomist manifest yml requires v for UpdateRugVersion should update to version range in a manifest yml", (p, world) => {
    let v = "[7.4.3,13.11.2)";
    return p.fileContains(".atomist/manifest.yml", 'requires: "' + v + '"');
});

Then("not result fileContains atomist manifest yml 0 6 0 for UpdateRugVersion should update to version range in a manifest yml", (p, world) => {
    let v = "[7.4.3,13.11.2)";
    return !p.fileContains(".atomist/manifest.yml", "0.6.0");
});

Then("not result fileContains atomist manifest yml 11 9 2 for UpdateRugVersion should update to version range in a manifest yml", (p, world) => {
    let v = "[7.4.3,13.11.2)";
    return !p.fileContains(".atomist/manifest.yml", "11.9.2");
});

Given("a file named .atomist/manifest.yml for UpdateRugVersion should update the version in a package.json", p => {
    p.addFile(".atomist/manifest.yml", `group: test-rugs
artifact: test-manifest
version: "0.1.0"
requires: "[0.12.0,1.0.0)"
dependencies:
extensions:
`)
});

Given("a file named .atomist/package.json for UpdateRugVersion should update the version in a package.json", p => {
    p.addFile(".atomist/package.json", `{
  "name": "@atomist-rugs/rug-tests",
  "version": "0.1.0",
  "description": "Editors for Rug Tests",
  "keywords": [
    "Atomist",
    "Rug"
  ],
  "author": "Atomist, Inc",
  "license": "Apache-2.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/atomist-rugs/rug-tests.git"
  },
  "bugs": {
    "url": "https://github.com/atomist-rugs/rug-tests/issues"
  },
  "homepage": "https://github.com/atomist-rugs/rug-tests",
  "dependencies": {
    "@atomist/rug": "0.6.0",
    "@college/dtc": "^3.5.7"
  },
  "scripts": {
    "rug-install": "rug install -urqX",
    "rug-test": "rug test -urqX",
    "rug-publish": "rug publish -urqX"
  }
}
`)
});

When("UpdateRugVersion manifest_version is v, package_version is ~11.9.2 for UpdateRugVersion should update the version in a package.json", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("UpdateRugVersion");
    let v = "7.4.3";
    psworld.editWith(editor, { manifest_version: v, package_version: "~11.9.2", v: "7.4.3" });
});

Then("fileContains atomist package json atomist rug 11 9 2 for UpdateRugVersion should update the version in a package json", (p, world) => {
    let v = "7.4.3";
    return p.fileContains(".atomist/package.json", '"@atomist/rug": "~11.9.2"');
});

Then("fileContains atomist package json college dtc 3 5 7 for UpdateRugVersion should update the version in a package json", (p, world) => {
    let v = "7.4.3";
    return p.fileContains(".atomist/package.json", '"@college/dtc": "^3.5.7"');
});

Then("not result fileContains atomist package json 0 6 0 for UpdateRugVersion should update the version in a package json", (p, world) => {
    let v = "7.4.3";
    return !p.fileContains(".atomist/package.json", "0.6.0");
});

Then("not result fileContains atomist package json v for UpdateRugVersion should update the version in a package json", (p, world) => {
    let v = "7.4.3";
    return !p.fileContains(".atomist/package.json", v);
});

Given("a file named .atomist/manifest.yml for UpdateRugVersion should update the version in a squashed package.json", p => {
    p.addFile(".atomist/manifest.yml", `group: test-rugs
artifact: test-manifest
version: "0.1.0"
requires: "[0.12.0,1.0.0)"
dependencies:
extensions:
`)
});

Given("a file named .atomist/package.json for UpdateRugVersion should update the version in a squashed package.json", p => { p.addFile(".atomist/package.json", `{"name":"@atomist-rugs/rug-tests","version":"0.1.0","description":"Editors for Rug Tests","keywords":["Atomist","Rug"],"author":"Atomist, Inc","license":"Apache-2.0","repository":{"type":"git","url":"https://github.com/atomist-rugs/rug-tests.git"},"bugs":{"url":"https://github.com/atomist-rugs/rug-tests/issues"},"homepage":"https://github.com/atomist-rugs/rug-tests","dependencies":{"@atomist/rug":"0.6.0","@college/dtc": "^3.5.7"},"scripts":{"rug-install":"rug install -urqX","rug-test":"rug test -urqX","rug-publish":"rug publish -urqX"}}`) });

When("UpdateRugVersion for UpdateRugVersion should update the version in a squashed package.json", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("UpdateRugVersion");
    let manifest_version = "7.4.3";
    let package_version = "~11.9.2";
    psworld.editWith(editor, { manifest_version: "7.4.3", package_version: "~11.9.2" });
});

Then("fileContains atomist package json atomist rug 11 9 2 for UpdateRugVersion should update the version in a squashed package json", (p, world) => {
    let manifest_version = "7.4.3";
    let package_version = "~11.9.2";
    return p.fileContains(".atomist/package.json", '"@atomist/rug": "~11.9.2"');
});

Then("fileContains atomist package json college dtc 3 5 7 for UpdateRugVersion should update the version in a squashed package json", (p, world) => {
    let manifest_version = "7.4.3";
    let package_version = "~11.9.2";
    return p.fileContains(".atomist/package.json", '"@college/dtc": "^3.5.7"');
});

Then("not result fileContains atomist package json 0 6 0 for UpdateRugVersion should update the version in a squashed package json", (p, world) => {
    let manifest_version = "7.4.3";
    let package_version = "~11.9.2";
    return !p.fileContains(".atomist/package.json", "0.6.0");
});

Then("not result fileContains atomist package json manifest version for UpdateRugVersion should update the version in a squashed package json", (p, world) => {
    let manifest_version = "7.4.3";
    let package_version = "~11.9.2";
    return !p.fileContains(".atomist/package.json", manifest_version);
});

Given("nothing for UpdateRugVersion should do nothing if not a Rug Archive project", p => { });

When("UpdateRugVersion manifest_version is v, package_version is ~11.9.2 for UpdateRugVersion should do nothing if not a Rug Archive project", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("UpdateRugVersion");
    let v = "13.11.2";
    psworld.editWith(editor, { manifest_version: v, package_version: "~11.9.2", v: "13.11.2" });
});

Then("no change for UpdateRugVersion should do nothing if not a Rug Archive project", (p, world) => {
    let v = "13.11.2";
    return !world.modificationsMade();
});
