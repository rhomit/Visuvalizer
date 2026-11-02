const conceptLibrary = {
  algorithms: {
    label: "Data Structures & Algorithms",
    items: [
      {
        id: "bubble-sort",
        title: "Bubble Sort",
        description:
          "Compare adjacent values and swap them when they are out of order until the list is sorted.",
        summary: [
          "Repeated passes",
          "Adjacent comparisons",
          "Stable sorting behavior"
        ],
        render: renderBubbleSort
      },
      {
        id: "binary-search",
        title: "Binary Search",
        description:
          "Split a sorted list in half and discard the side that cannot contain the target value.",
        summary: [
          "Sorted input required",
          "O(log n) time complexity",
          "Efficient for large arrays"
        ],
        render: renderBinarySearch
      },
      {
        id: "breadth-first-search",
        title: "Breadth-First Search",
        description:
          "Explore graph nodes level by level, often used for shortest-path traversal in unweighted graphs.",
        summary: [
          "Queue-based exploration",
          "Finds shortest distance",
          "Works on connected graphs"
        ],
        render: renderBFS
      }
    ]
  },
  patterns: {
    label: "Design Patterns",
    items: [
      {
        id: "observer",
        title: "Observer",
        description:
          "One subject notifies many observers when state changes, creating a loose dependency between them.",
        summary: [
          "Push-based updates",
          "Subject/Observer coupling",
          "UI event systems"
        ],
        render: renderObserverPattern
      },
      {
        id: "factory",
        title: "Factory",
        description:
          "Create objects through a common interface without exposing construction details to callers.",
        summary: [
          "Encapsulates object creation",
          "Centralizes logic",
          "Supports polymorphism"
        ],
        render: renderFactoryPattern
      }
    ]
  },
  architectures: {
    label: "Common Architectures",
    items: [
      {
        id: "mvc",
        title: "MVC",
        description:
          "Split responsibilities into Model, View, and Controller to organize application behavior.",
        summary: [
          "Model stores data",
          "View handles presentation",
          "Controller manages flow"
        ],
        render: renderMVCArchitecture
      },
      {
        id: "microservices",
        title: "Microservices",
        description:
          "Break the system into independently deployable services that communicate through APIs.",
        summary: [
          "Independent deployment",
          "Service boundaries",
          "Distributed communication"
        ],
        render: renderMicroservicesArchitecture
      },
      {
        id: "layered",
        title: "Layered Architecture",
        description:
          "Organize code into horizontal layers such as presentation, business logic, and persistence.",
        summary: [
          "Clear separation",
          "Single responsibility",
          "Easier maintenance"
        ],
        render: renderLayeredArchitecture
      }
    ]
  }
};

const state = {
  category: "algorithms",
  itemId: "bubble-sort"
};

const conceptSelect = document.getElementById("conceptSelect");
const conceptTitle = document.getElementById("conceptTitle");
const conceptDescription = document.getElementById("conceptDescription");
const topicList = document.getElementById("topicList");
const visualContainer = document.getElementById("visualContainer");
const navButtons = [...document.querySelectorAll(".nav-button")];

function initialize() {
  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.category = button.dataset.category;
      const items = conceptLibrary[state.category].items;
      state.itemId = items[0].id;
      renderCategory(state.category, state.itemId);
    });
  });

  conceptSelect.addEventListener("change", (event) => {
    state.itemId = event.target.value;
    renderCategory(state.category, state.itemId);
  });

  renderCategory(state.category, state.itemId);
}

function renderCategory(categoryKey, itemId) {
  const category = conceptLibrary[categoryKey];
  const selectedItem = category.items.find((item) => item.id === itemId) || category.items[0];

  state.category = categoryKey;
  state.itemId = selectedItem.id;

  conceptTitle.textContent = selectedItem.title;
  conceptDescription.textContent = selectedItem.description;
  topicList.innerHTML = selectedItem.summary
    .map((point) => `<li>${point}</li>`)
    .join("");

  navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.category === categoryKey);
  });

  conceptSelect.innerHTML = category.items
    .map(
      (item) =>
        `<option value="${item.id}" ${item.id === selectedItem.id ? "selected" : ""}>${item.title}</option>`
    )
    .join("");

  visualContainer.innerHTML = "";
  selectedItem.render(visualContainer);
}

function createActionRow(primaryLabel, primaryAction, secondaryLabel, secondaryAction) {
  const row = document.createElement("div");
  row.className = "action-row";

  const primary = document.createElement("button");
  primary.className = "action-button";
  primary.textContent = primaryLabel;
  primary.addEventListener("click", primaryAction);

  row.appendChild(primary);

  if (secondaryLabel && secondaryAction) {
    const secondary = document.createElement("button");
    secondary.className = "action-button secondary";
    secondary.textContent = secondaryLabel;
    secondary.addEventListener("click", secondaryAction);
    row.appendChild(secondary);
  }

  return row;
}

function createSummaryStrip(values) {
  const strip = document.createElement("div");
  strip.className = "summary-strip";

  values.forEach(([label, value]) => {
    const metric = document.createElement("div");
    metric.className = "metric";

    const labelNode = document.createElement("span");
    labelNode.className = "metric-label";
    labelNode.textContent = label;

    const valueNode = document.createElement("span");
    valueNode.className = "metric-value";
    valueNode.textContent = value;

    metric.append(labelNode, valueNode);
    strip.appendChild(metric);
  });

  return strip;
}

function renderBubbleSort(container) {
  const section = document.createElement("div");
  section.className = "visual-section";

  const title = document.createElement("h3");
  title.textContent = "Sorting in motion";
  section.appendChild(title);

  const values = [8, 3, 5, 1, 7, 9, 2, 6];
  const barsContainer = document.createElement("div");
  barsContainer.className = "sort-grid";

  let steps = [];

  function generateSteps(array) {
    const copy = [...array];
    const history = [];
    const length = copy.length;

    for (let i = 0; i < length; i += 1) {
      let swapped = false;
      for (let j = 0; j < length - i - 1; j += 1) {
        history.push({
          array: [...copy],
          active: [j, j + 1],
          swapped: false,
          sorted: []
        });

        if (copy[j] > copy[j + 1]) {
          [copy[j], copy[j + 1]] = [copy[j + 1], copy[j]];
          swapped = true;
          history.push({
            array: [...copy],
            active: [j, j + 1],
            swapped: true,
            sorted: []
          });
        }
      }

      history.push({
        array: [...copy],
        active: [],
        swapped: false,
        sorted: Array.from({ length: i + 1 }, (_, index) => length - index - 1)
      });

      if (!swapped) break;
    }

    return history;
  }

  steps = generateSteps(values);

  function renderBars(valuesState, active, swapped, sortedSet) {
    barsContainer.innerHTML = "";

    valuesState.forEach((value, index) => {
      const bar = document.createElement("div");
      bar.className = "bar";
      bar.style.height = `${value * 24}px`;
      bar.textContent = value;

      if (active.includes(index)) bar.classList.add("active");
      if (swapped && active.includes(index)) bar.classList.add("swapped");
      if (sortedSet.includes(index)) bar.classList.add("completed");

      barsContainer.appendChild(bar);
    });
  }

  renderBars(values, [], false, []);

  const actions = createActionRow(
    "Start animation",
    () => {
      let index = 0;
      const interval = setInterval(() => {
        if (index >= steps.length) {
          clearInterval(interval);
          return;
        }

        const current = steps[index];
        renderBars(current.array, current.active, current.swapped, current.sorted);
        index += 1;
      }, 500);
    },
    "Reset",
    () => renderBars(values, [], false, [])
  );

  section.appendChild(actions);
  section.appendChild(barsContainer);
  section.appendChild(createSummaryStrip([["Passes", "n"], ["Comparison", "Adjacent"], ["Complexity", "O(n²)"] ]));
  container.appendChild(section);
}

function renderBinarySearch(container) {
  const section = document.createElement("div");
  section.className = "visual-section";

  const numberList = [2, 4, 7, 9, 12, 15, 19, 21, 25, 30, 35, 42];
  const target = 21;
  const row = document.createElement("div");
  row.className = "search-row";

  function renderSearchState(low, high, mid, found) {
    row.innerHTML = "";

    numberList.forEach((num, index) => {
      const card = document.createElement("div");
      card.className = "search-card";
      if (index === mid) card.classList.add("active");
      if (num === target) card.classList.add("target");
      if (index < low || index > high) {
        card.style.opacity = "0.22";
      }
      if (found && index === mid) {
        card.style.background = "rgba(126, 240, 195, 0.22)";
      }
      card.textContent = num;
      row.appendChild(card);
    });
  }

  renderSearchState(0, numberList.length - 1, 5, false);

  const actions = createActionRow(
    "Run search",
    () => {
      let low = 0;
      let high = numberList.length - 1;
      let mid = Math.floor((low + high) / 2);
      const interval = setInterval(() => {
        if (low > high) {
          clearInterval(interval);
          return;
        }

        mid = Math.floor((low + high) / 2);
        renderSearchState(low, high, mid, numberList[mid] === target);

        if (numberList[mid] === target) {
          clearInterval(interval);
          return;
        }

        if (numberList[mid] < target) {
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }, 500);
    },
    "Reset",
    () => renderSearchState(0, numberList.length - 1, 5, false)
  );

  section.appendChild(actions);
  section.appendChild(row);
  section.appendChild(createSummaryStrip([["Target", target], ["Search pattern", "Divide & conquer"], ["Complexity", "O(log n)"] ]));
  container.appendChild(section);
}

function renderBFS(container) {
  const section = document.createElement("div");
  section.className = "visual-section";

  const graph = {
    A: ["B", "C"],
    B: ["D", "E"],
    C: ["F"],
    D: [],
    E: ["G"],
    F: [],
    G: []
  };

  const nodes = Object.keys(graph);
  const queue = ["A"];
  const visited = new Set();

  const grid = document.createElement("div");
  grid.className = "graph-grid";

  nodes.forEach((node) => {
    const cell = document.createElement("div");
    cell.className = "node";
    cell.textContent = node;
    grid.appendChild(cell);
  });

  function setNodeState(currentNode, visitedNodes) {
    const nodeCells = [...grid.children];
    nodeCells.forEach((cell) => {
      const nodeLabel = cell.textContent;
      cell.classList.remove("visited", "current");
      if (visitedNodes.has(nodeLabel)) {
        cell.classList.add("visited");
      }
      if (nodeLabel === currentNode) {
        cell.classList.add("current");
      }
    });
  }

  const actions = createActionRow(
    "Traverse graph",
    () => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex >= queue.length) {
          clearInterval(interval);
          return;
        }

        const currentNode = queue[currentIndex];
        if (!visited.has(currentNode)) {
          visited.add(currentNode);
          setNodeState(currentNode, visited);

          graph[currentNode].forEach((neighbor) => {
            if (!visited.has(neighbor) && !queue.includes(neighbor)) {
              queue.push(neighbor);
            }
          });
        }

        currentIndex += 1;
      }, 500);
    },
    "Reset",
    () => {
      visited.clear();
      setNodeState("", visited);
    }
  );

  section.appendChild(actions);
  section.appendChild(grid);
  section.appendChild(createSummaryStrip([["Traversal", "Level-order"], ["Queue", "FIFO"], ["Use case", "Shortest paths"] ]));
  container.appendChild(section);
}

function renderObserverPattern(container) {
  const section = document.createElement("div");
  section.className = "visual-section";

  const diagram = document.createElement("div");
  diagram.className = "pattern-diagram";

  const row = document.createElement("div");
  row.className = "pattern-row";

  const subject = document.createElement("div");
  subject.className = "module-box highlight";
  subject.textContent = "Subject";

  const observerA = document.createElement("div");
  observerA.className = "module-box";
  observerA.textContent = "Observer A";

  const observerB = document.createElement("div");
  observerB.className = "module-box";
  observerB.textContent = "Observer B";

  row.append(subject, observerA, observerB);

  const codeBlock = document.createElement("div");
  codeBlock.className = "code-block";
  codeBlock.innerHTML = `<pre>class Subject {
  constructor() { this.observers = []; }
  subscribe(fn) { this.observers.push(fn); }
  notify(data) { this.observers.forEach(fn => fn(data)); }
}

const subject = new Subject();
subject.subscribe(console.log);
subject.notify({ type: "UPDATE" });</pre>`;

  const explanation = document.createElement("p");
  explanation.className = "explanation";
  explanation.textContent =
    "The subject holds a list of observers. When its state changes, it broadcasts an update, allowing multiple listeners to react without directly depending on one another.";

  diagram.append(row, codeBlock, explanation);
  section.appendChild(diagram);
  container.appendChild(section);
}

function renderFactoryPattern(container) {
  const section = document.createElement("div");
  section.className = "visual-section";

  const diagram = document.createElement("div");
  diagram.className = "pattern-diagram";

  const row = document.createElement("div");
  row.className = "pattern-row";

  const factory = document.createElement("div");
  factory.className = "module-box highlight";
  factory.textContent = "Factory";

  const app = document.createElement("div");
  app.className = "module-box";
  app.textContent = "App";

  const car = document.createElement("div");
  car.className = "module-box warning";
  car.textContent = "Car";

  const bike = document.createElement("div");
  bike.className = "module-box warning";
  bike.textContent = "Bike";

  row.append(factory, app, car, bike);

  const codeBlock = document.createElement("div");
  codeBlock.className = "code-block";
  codeBlock.innerHTML = `<pre>class VehicleFactory {
  create(type) {
    if (type === "car") return new Car();
    if (type === "bike") return new Bike();
    throw new Error("Unknown type");
  }
}

const factory = new VehicleFactory();
const ride = factory.create("car");</pre>`;

  const explanation = document.createElement("p");
  explanation.className = "explanation";
  explanation.textContent =
    "The factory isolates object creation behind a common API. This keeps the client code simple and allows new vehicle types to be added without rewriting calling logic.";

  diagram.append(row, codeBlock, explanation);
  container.appendChild(diagram);
}

function renderMVCArchitecture(container) {
  const section = document.createElement("div");
  section.className = "visual-section";

  const diagram = document.createElement("div");
  diagram.className = "architecture-diagram";

  const row = document.createElement("div");
  row.className = "arch-row";

  const model = document.createElement("div");
  model.className = "module-box";
  model.textContent = "Model";

  const view = document.createElement("div");
  view.className = "module-box";
  view.textContent = "View";

  const controller = document.createElement("div");
  controller.className = "module-box highlight";
  controller.textContent = "Controller";

  row.append(model, view, controller);

  const explanation = document.createElement("p");
  explanation.className = "explanation";
  explanation.textContent =
    "The Model manages application data, the View presents it, and the Controller handles user input and updates the state. This separation helps keep a UI app easier to test and evolve.";

  diagram.appendChild(row);
  diagram.appendChild(explanation);
  section.appendChild(diagram);
  container.appendChild(section);
}

function renderMicroservicesArchitecture(container) {
  const section = document.createElement("div");
  section.className = "visual-section";

  const diagram = document.createElement("div");
  diagram.className = "architecture-diagram";

  const row = document.createElement("div");
  row.className = "arch-row";

  ["Auth", "Orders", "Inventory", "Billing"].forEach((service) => {
    const box = document.createElement("div");
    box.className = "module-box";
    box.textContent = service;
    row.appendChild(box);
  });

  const explanation = document.createElement("p");
  explanation.className = "explanation";
  explanation.textContent =
    "Each service owns a specific business capability and communicates with others over a network. This allows teams to scale and deploy features independently, but introduces complexity around coordination and data consistency.";

  diagram.append(row, explanation);
  section.appendChild(diagram);
  container.appendChild(section);
}

function renderLayeredArchitecture(container) {
  const section = document.createElement("div");
  section.className = "visual-section";

  const diagram = document.createElement("div");
  diagram.className = "architecture-diagram";

  const layers = ["Presentation", "Application", "Domain", "Persistence"];

  layers.forEach((layer) => {
    const row = document.createElement("div");
    row.className = "arch-row";
    const box = document.createElement("div");
    box.className = "module-box";
    box.textContent = layer;
    row.appendChild(box);
    diagram.appendChild(row);
  });

  const explanation = document.createElement("p");
  explanation.className = "explanation";
  explanation.textContent =
    "Application logic is grouped into layers, usually with presentation, business rules, and data access concerns separated. This encourages modularity and easier maintenance for medium-sized systems.";

  diagram.appendChild(explanation);
  section.appendChild(diagram);
  container.appendChild(section);
}

initialize();
