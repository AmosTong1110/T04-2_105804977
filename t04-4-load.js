// Load the tvBrandCount.csv file from /data
d3.csv("data/tvBrandCount.csv", d => {
console.log(d); // inspect raw rows as they stream in
});
d3.csv("data/tvBrandCount.csv", d => {
return {
brand: d.brand,
count: +d.count // '+' converts string to number
};
}).then(data => {
console.log(data); // array of typed objects
});
/* Load CSV, Convert Type, Quick Check */
d3.csv("data/tvBrandCount.csv", d => ({
brand: d.brand,
count: +d.count
})).then(data => {
// Quick check
console.log(data); // whole array
console.log("rows:", data.length);
console.log("max:", d3.max(data, d => d.count));
console.log("min:", d3.min(data, d => d.count));
console.log("extent:", d3.extent(data, d => d.count)); // [min, max]
//Optional: sort for easier reading (descending by count)
data.sort((a, b) => d3.descending(a.count, b.count));
const createBarChart = (data) => {
const svg = d3.select(".responsive-svg-container")
.append("svg")
.attr("viewBox", "0 0 1200 400")
.style("border", "1px solid black");
svg
.selectAll("rect")
.data(data)
.join("rect")
.attr("class", d => {
console.log(d); //inspect each row in the Console
return `bar bar-${d.count}`; //"bar bar-859"
});
};
createBarChart(data);
});

function createBarChart(data) {
const svg = d3.select(".responsive-svg-container")
.append("svg")
.attr("viewBox", "0 0 1200 400") // temporary; we’ll adjust layout soon
.attr("role", "img")
.style("border", "1px solid black"); // dev-only border so we see the canvas

const x = d3.scaleBand()
  .domain(data.map(d => d.brand))
  .range([40, 1160])
  .padding(0.2);
const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.count)])
  .nice()
  .range([350, 40]);

svg
.selectAll("rect")
.data(data)
.join("rect")
.attr("x", d => x(d.brand))
.attr("y", d => y(d.count))
.attr("width", x.bandwidth())
.attr("height", d => 350 - y(d.count))
.attr("fill", "steelblue");
}
