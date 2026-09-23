const createBarChart = (data) => {
  // --- Sizes (logical vs. display) ---
  const viewW = 500;   // narrow on purpose (forces x scaling)
  const viewH = 1600;  // tall logical space for many bars

  // Physical display size (what you actually see on the page)
  const displayW = 640; // try 480-800 as you prefer
  const displayH = 420; // try 360-500

  // --- SVG root ---
  const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", `0 0 ${viewW} ${viewH}`) // logical coords
    .attr("width", displayW)  // actual rendered size
    .attr("height", displayH) // actual rendered size
    .style("border", "1px solid black");

  // --- Scales ---
  // X scale (numeric, e.g. count) -> maps data values to pixel widths
  const xMax = d3.max(data, d => d.count);
  const xScale = d3.scaleLinear()
    .domain([0, xMax])   // data space
    .range([0, viewW]);  // pixels across the logical width

  // Y scale (categorical, e.g. brand) -> maps each brand to a vertical band
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, viewH])
    .paddingInner(0.2)
    .paddingOuter(0.1);

  // --- Bars ---
  svg.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", d => `bar bar-${d.count}`)
    .attr("x", 0)
    .attr("y", d => yScale(d.brand))
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("fill", "steelblue");
};