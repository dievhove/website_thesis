document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.getElementById("test-dropdown");

    // Function to fetch test list from server/database
    function fetchTestList() {
        // Simulating an API call (replace with actual API call)
        const testList = [
            { id: 1, name: "Test 2025-02-16 10:30" },
            { id: 2, name: "Test 2025-02-23 14:15" },
            { id: 3, name: "Test 2025-02-28 12:51" },
        ];

        // Sort tests by ID (latest first)
        testList.sort((a, b) => b.id - a.id);

        // Populate dropdown
        testList.forEach((test, index) => {
            let option = document.createElement("option");
            option.value = test.id;
            option.textContent = test.name;
            dropdown.appendChild(option);
        });

        // Set default selection to latest test
        if (testList.length > 0) {
            dropdown.value = testList[0].id;
            loadTestData(testList[0].id);
        }
    }

    // Function to load test data when selection changes
    function loadTestData(testId) {
        console.log("Loading data for test:", testId);
        // Call API or update UI based on selected test
        // Example: fetch(`/api/testdata/${testId}`).then(response => response.json()).then(updateUI);
    }

    // Event listener for dropdown change
    dropdown.addEventListener("change", function () {
        loadTestData(this.value);
    });

    // Fetch test list on page load
    fetchTestList();
});

/*
function updateArenaTest(selectedTest) {
    document.getElementById("pdf-viewer").src = `path/to/${selectedTest}.pdf`;
    document.getElementById("heatmap-image").src = `path/to/${selectedTest}.png`;
    document.getElementById("arena-video").querySelector("source").src = `path/to/${selectedTest}.mp4`;
    document.getElementById("arena-video").load(); // Refresh video source
}

// Example: Update when dropdown changes
document.getElementById("test-dropdown").addEventListener("change", function() {
    updateArenaTest(this.value);
});
*/

async function loadCSV() {
    const response = await fetch("arenatest_dummy/arenatest_statistieken.csv");
    const text = await response.text();

    const rows = text.trim().split("\n").map(row => row.split(","));
    const headers = rows.shift(); // First row as headers

    let data = {};
    headers.forEach(header => (data[header] = []));

    rows.forEach(row => {
        row.forEach((value, index) => {
            data[headers[index]].push(parseFloat(value));
        });
    });
    return data;
}

function createChart(containerId, label, color, data) {
    var chart = echarts.init(document.getElementById(containerId));
    var option = {
        grid: { left: 60, right: 20, top: 20, bottom: 30 },
        tooltip: { trigger: 'axis' },
        responsive: true,
        xAxis: {
            type: 'category',
            data: Array.from({ length: data.length }, (_, i) => i), // Generate correct frame indices
            axisLabel: { rotate: 45 }
        },
        yAxis: {
            type: 'value',
            name: label,
            nameLocation: 'center',
            nameGap: 35
        },
        series: [{
            data: data, // Correctly assign the data to Y-axis
            type: 'line',
            smooth: true,
            color: color
        }]
    };

    chart.setOption(option);
}
async function createCharts() {
    const data = await loadCSV();

    const frames = data["Frame"];

    createChart("chart1", "Distance (px)", "red", data["Avg Bee-Bee Dist"]);
    createChart("chart2", "Distance (px)", "blue", data["Avg Bee-Center Dist"]);
    createChart("chart3", "Distance (px)", "green", data["Avg Bee-Edge Dist"]);
    createChart("chart4", "Distance (px)", "purple", data["Avg Bee-Mite Dist"]);
    createChart("chart5", "#Frames", "orange", data["Frames with Bees Close to Mites\r"]);
}

//Later dynamisch laten gebeuren
createCharts();
