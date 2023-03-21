"use strict";

class Node {
  constructor(ele, next, top, bottom) {
    this.ele = ele;
    this.next = next;
    this.top = top;
    this.bottom = bottom;

    if (this.top && this.bottom) {
      this.top.next = this;
      this.bottom.next = this;
    }

    if (this.teamName === "None") {
      this.setTeamName("");
    }

    this.created = false;
  }

  get teamName() {
    let name = this.ele.querySelector("span").textContent;
    return name.trim();
}

  setTeamName(teamName) {
    console.log(teamName);

    this.ele.querySelector("input").value = teamName;
    this.setUnchecked();

    let textNode = this.ele.querySelector("span");
    console.log(textNode);
    textNode.textContent = ` ${teamName}`;

    let imgNode = this.ele.querySelector(".team-img");
    console.log(imgNode);
    imgNode.src = teamNameToSVGFileName(teamName);
    imgNode.alt = teamName;
  }

  setUnchecked() {
    this.ele.querySelector("input").checked = false;
  }

  setNullValue() {
    this.setTeamName("");
  }
}

function clearNext(node, exclusions) {
  if (node && exclusions.has(node.teamName)) {
    node.setUnchecked();
    node.setNullValue();

    clearNext(node.next, exclusions);
  }
}

function nodeClick(id) {
  console.log(id);

  let node = NODES[id];

  console.log(node);

  if (!node.teamName) {
    return node.setUnchecked();
  }

  for (let ele of node.ele.parentElement.children) {
    ele.classList.remove("red-border");
  }

  let next = node.next;

  if (next) {
    if (node.teamName === next.teamName) {
      return;
    }

    next.setTeamName(node.teamName);

    let exclusions = new Set([next.top.teamName, next.bottom.teamName]);
    clearNext(next.next, exclusions);
  }
}

function checkAllInputs(event) {
  event.preventDefault();
  let failed = false;
  for (let i = 1; i < 16; i++) {
    let [input1, input2] = document.querySelectorAll(
      `input[type='radio'][name='game${i}']`
    );
    // console.log(inputs);
    if (!input1.checked && !input2.checked) {
      console.log(input1.name);
      input1.parentElement.parentElement.classList.add("red-border");
      input2.parentElement.parentElement.classList.add("red-border");
      failed = true;
    } else {
      input1.parentElement.parentElement.classList.remove("red-border");
      input2.parentElement.parentElement.classList.remove("red-border");
    }
  }

  if (!failed) {
    document.querySelector("#updateBracketInput").click();
  }
}
