<template>
  <div class="charts-wrapper">
    <h2>Book Ratings Bar Chart</h2>
    <div id="ratings-bar-chart" class="chart-container"></div>

    <h2>Book Distribution Pie Chart</h2>
    <div id="book-distribution-pie" class="chart-container"></div>

    <h2>Monthly Borrowed Books</h2>
    <div id="borrowed-line-chart" class="chart-container"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import * as d3 from 'd3'

onMounted(() => {
  // Bar Chart - Ratings
  const ratingsData = [
    { title: 'The Midnight Library', rating: 4.2 },
    { title: 'Klara and the Sun', rating: 3.8 },
    { title: 'Project Hail Mary', rating: 4.7 },
    { title: 'The Four Winds', rating: 4.0 }
  ];

  const barWidth = 400;
  const barHeight = 300;
  const barMargin = { top: 30, right: 20, bottom: 40, left: 50 };

  const barSvg = d3.select('#ratings-bar-chart')
      .append('svg')
      .attr('width', barWidth)
      .attr('height', barHeight);

  const x = d3.scaleBand()
      .domain(ratingsData.map(d => d.title))
      .range([barMargin.left, barWidth - barMargin.right])
      .padding(0.2);

  const y = d3.scaleLinear()
      .domain([0, 5])
      .range([barHeight - barMargin.bottom, barMargin.top]);

  barSvg.append('g')
      .selectAll('rect')
      .data(ratingsData)
      .enter()
      .append('rect')
      .attr('x', d => x(d.title))
      .attr('y', d => y(d.rating))
      .attr('width', x.bandwidth())
      .attr('height', d => barHeight - barMargin.bottom - y(d.rating))
      .attr('fill', '#d97706');

  barSvg.append('g')
      .attr('transform', `translate(0,${barHeight - barMargin.bottom})`)
      .call(d3.axisBottom(x));

  barSvg.append('g')
      .attr('transform', `translate(${barMargin.left},0)`)
      .call(d3.axisLeft(y));

  // Pie Chart - Distribution
  const pieData = [
    { category: 'Total Books', count: 2547 },
    { category: 'Books Borrowed', count: 428 },
    { category: 'Overdue Books', count: 23 }
  ];

  const pieWidth = 300;
  const pieHeight = 300;
  const radius = Math.min(pieWidth, pieHeight) / 2;

  const pieSvg = d3.select('#book-distribution-pie')
      .append('svg')
      .attr('width', pieWidth)
      .attr('height', pieHeight)
      .append('g')
      .attr('transform', `translate(${pieWidth / 2}, ${pieHeight / 2})`);

  const pie = d3.pie().value(d => d.count);
  const arc = d3.arc().innerRadius(0).outerRadius(radius);

  const color = d3.scaleOrdinal()
      .domain(pieData.map(d => d.category))
      .range(['#fbbf24', '#3b82f6', '#ef4444']);

  pieSvg.selectAll('path')
      .data(pie(pieData))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.category))
      .attr('stroke', 'white')
      .style('stroke-width', '2px');

  // Line Chart - Monthly Borrowings
  const borrowedData = [
    { month: 'Jan', count: 310 },
    { month: 'Feb', count: 260 },
    { month: 'Mar', count: 428 },
    { month: 'Apr', count: 390 }
  ];

  const lineWidth = 400;
  const lineHeight = 300;
  const lineMargin = { top: 30, right: 20, bottom: 40, left: 50 };

  const lineSvg = d3.select('#borrowed-line-chart')
      .append('svg')
      .attr('width', lineWidth)
      .attr('height', lineHeight);

  const lineX = d3.scalePoint()
      .domain(borrowedData.map(d => d.month))
      .range([lineMargin.left, lineWidth - lineMargin.right]);

  const lineY = d3.scaleLinear()
      .domain([0, d3.max(borrowedData, d => d.count)])
      .range([lineHeight - lineMargin.bottom, lineMargin.top]);

  const line = d3.line()
      .x(d => lineX(d.month))
      .y(d => lineY(d.count));

  lineSvg.append('path')
      .datum(borrowedData)
      .attr('fill', 'none')
      .attr('stroke', '#10b981')
      .attr('stroke-width', 2)
      .attr('d', line);

  lineSvg.append('g')
      .attr('transform', `translate(0,${lineHeight - lineMargin.bottom})`)
      .call(d3.axisBottom(lineX));

  lineSvg.append('g')
      .attr('transform', `translate(${lineMargin.left},0)`)
      .call(d3.axisLeft(lineY));
});
</script>

<style scoped>
.charts-wrapper {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.charts-wrapper h2 {
  margin-top: 0;
  font-size: 1.25rem;
  color: #111827;
}

.chart-container {
  margin-top: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>