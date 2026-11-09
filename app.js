const transportData = [
  {
    id: 'north-loop',
    route: 'North Loop',
    bus: 'CT-204',
    driver: 'Mr. Anand',
    status: 'On time',
    nextDeparture: '08:15 AM',
    time: 'morning',
    seats: 20,
    filled: 12,
    pickup: 'Main Gate',
    stops: ['Main Gate', 'Library', 'Hostel A', 'Academic Block'],
    availability: 'Available',
    capacity: 'Good'
  },
  {
    id: 'city-link',
    route: 'City Link',
    bus: 'CT-118',
    driver: 'Ms. Meera',
    status: 'Delayed',
    nextDeparture: '09:30 AM',
    time: 'morning',
    seats: 18,
    filled: 16,
    pickup: 'Bus Stand',
    stops: ['Bus Stand', 'Cafeteria', 'Research Block', 'Hostel B'],
    availability: 'Limited',
    capacity: 'Busy'
  },
  {
    id: 'hostel-circle',
    route: 'Hostel Circle',
    bus: 'CT-321',
    driver: 'Mr. Kiran',
    status: 'On time',
    nextDeparture: '12:20 PM',
    time: 'afternoon',
    seats: 22,
    filled: 18,
    pickup: 'Hostel A',
    stops: ['Hostel A', 'Sports Complex', 'Admin Block', 'Main Gate'],
    availability: 'Available',
    capacity: 'Good'
  },
  {
    id: 'science-corridor',
    route: 'Science Corridor',
    bus: 'CT-409',
    driver: 'Ms. Hema',
    status: 'On time',
    nextDeparture: '03:10 PM',
    time: 'afternoon',
    seats: 20,
    filled: 11,
    pickup: 'Science Block',
    stops: ['Science Block', 'Library', 'Auditorium', 'Hostel C'],
    availability: 'Available',
    capacity: 'Good'
  },
  {
    id: 'evening-trek',
    route: 'Evening Trek',
    bus: 'CT-226',
    driver: 'Mr. Raghav',
    status: 'On time',
    nextDeparture: '06:40 PM',
    time: 'evening',
    seats: 15,
    filled: 9,
    pickup: 'Main Gate',
    stops: ['Main Gate', 'Station Road', 'Girls Hostel', 'Garden Gate'],
    availability: 'Available',
    capacity: 'Good'
  },
  {
    id: 'staff-express',
    route: 'Staff Express',
    bus: 'CT-712',
    driver: 'Mr. Suresh',
    status: 'On time',
    nextDeparture: '07:10 PM',
    time: 'evening',
    seats: 12,
    filled: 7,
    pickup: 'Admin Block',
    stops: ['Admin Block', 'Main Gate', 'Residential Area'],
    availability: 'Available',
    capacity: 'Good'
  }
];

const alerts = [
  'Route 2 has a slight delay due to traffic near the city junction.',
  'Students must carry ID cards during evening bus travel.',
  'New pickup point added for Hostel B during morning schedule.',
  'All buses are operating normally with safety checks completed.'
];

const stats = [
  { label: 'Active buses', value: '08' },
  { label: 'Routes today', value: '06' },
  { label: 'Students served', value: '1.8K' },
  { label: 'On-time rate', value: '96%' }
];

const routeFilter = document.getElementById('routeFilter');
const timeFilter = document.getElementById('timeFilter');
const searchInput = document.getElementById('searchInput');
const routeCards = document.getElementById('routeCards');
const scheduleTable = document.getElementById('scheduleTable');
const routeSelect = document.getElementById('routeSelect');
const statsGrid = document.getElementById('statsGrid');
const transportForm = document.getElementById('transportForm');
const alertsList = document.getElementById('alertsList');
const toast = document.getElementById('toast');

function renderStats() {
  statsGrid.innerHTML = stats
    .map(
      (stat) => `
        <div class="stats-card">
          <span class="label">${stat.label}</span>
          <span class="value">${stat.value}</span>
        </div>
      `
    )
    .join('');
}

function renderAlerts() {
  alertsList.innerHTML = alerts
    .map(
      (alert) => `
        <li>${alert}</li>
      `
    )
    .join('');
}

function populateRouteFilters() {
  const routeOptions = [...new Set(transportData.map((item) => item.route))];

  routeFilter.innerHTML = '<option value="all">All routes</option>' +
    routeOptions.map((route) => `<option value="${route}">${route}</option>`).join('');

  routeSelect.innerHTML = '<option value="">Select route</option>' +
    routeOptions.map((route) => `<option value="${route}">${route}</option>`).join('');
}

function getVisibleData() {
  const selectedRoute = routeFilter.value;
  const selectedTime = timeFilter.value;
  const searchTerm = searchInput.value.trim().toLowerCase();

  return transportData.filter((item) => {
    const matchesRoute = selectedRoute === 'all' || item.route === selectedRoute;
    const matchesTime = selectedTime === 'all' || item.time === selectedTime;
    const searchableText = [item.route, item.bus, item.pickup, item.driver, ...item.stops].join(' ').toLowerCase();
    const matchesSearch = !searchTerm || searchableText.includes(searchTerm);
    return matchesRoute && matchesTime && matchesSearch;
  });
}

function renderRouteCards() {
  const visibleData = getVisibleData();

  if (!visibleData.length) {
    routeCards.innerHTML = '<div class="route-card"><h3>No routes found</h3></div>';
    return;
  }

  routeCards.innerHTML = visibleData
    .map(
      (route) => `
        <article class="route-card">
          <div class="route-header">
            <h3>${route.route}</h3>
            <span class="trip-badge">${route.availability}</span>
          </div>

          <div class="meta">
            <div class="meta-row"><span>Bus</span><strong>${route.bus}</strong></div>
            <div class="meta-row"><span>Driver</span><strong>${route.driver}</strong></div>
            <div class="meta-row"><span>Departure</span><strong>${route.nextDeparture}</strong></div>
            <div class="meta-row"><span>Capacity</span><strong>${route.filled} / ${route.seats}</strong></div>
          </div>

          <ul class="route-stops">
            ${route.stops.map((stop) => `<li>${stop}</li>`).join('')}
          </ul>
        </article>
      `
    )
    .join('');
}

function renderScheduleTable() {
  const visibleData = getVisibleData();

  scheduleTable.innerHTML = visibleData
    .map(
      (route) => `
        <tr>
          <td>${route.route}</td>
          <td>${route.bus}</td>
          <td>${route.pickup}</td>
          <td>${route.nextDeparture}</td>
          <td><span class="status-tag ${route.status === 'Delayed' ? 'delayed' : 'on-time'}">${route.status}</span></td>
        </tr>
      `
    )
    .join('');
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

routeFilter.addEventListener('change', () => {
  renderRouteCards();
  renderScheduleTable();
});

timeFilter.addEventListener('change', () => {
  renderRouteCards();
  renderScheduleTable();
});

searchInput.addEventListener('input', () => {
  renderRouteCards();
  renderScheduleTable();
});

transportForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const department = document.getElementById('department').value.trim();
  const pickupPoint = document.getElementById('pickupPoint').value.trim();
  const selectedRoute = document.getElementById('routeSelect').value;

  if (!name || !department || !pickupPoint || !selectedRoute) {
    showToast('Please complete the form before submitting.');
    return;
  }

  showToast(`Transport request submitted for ${name} on ${selectedRoute}.`);
  transportForm.reset();
});

populateRouteFilters();
renderStats();
renderAlerts();
renderRouteCards();
renderScheduleTable();
