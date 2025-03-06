// Your code here.
// Select all the items (cubes)
const items = document.querySelectorAll('.item');
const container = document.querySelector('.items'); // Container where the items are placed

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

// Mouse down event - when the user clicks on a cube
items.forEach(item => {
  item.addEventListener('mousedown', (e) => {
    selectedCube = item;  // Mark the cube as selected
    offsetX = e.clientX - selectedCube.getBoundingClientRect().left;
    offsetY = e.clientY - selectedCube.getBoundingClientRect().top;

    // Add mousemove and mouseup event listeners
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
});

// Mouse move event - when the mouse is moved while holding the cube
function onMouseMove(e) {
  if (selectedCube) {
    // Calculate the new position
    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;

    // Get the container boundaries
    const containerRect = container.getBoundingClientRect();

    // Ensure the cube stays within the container's boundaries
    if (newX < containerRect.left) newX = containerRect.left;
    if (newY < containerRect.top) newY = containerRect.top;
    if (newX + selectedCube.offsetWidth > containerRect.right) newX = containerRect.right - selectedCube.offsetWidth;
    if (newY + selectedCube.offsetHeight > containerRect.bottom) newY = containerRect.bottom - selectedCube.offsetHeight;

    // Update the cube's position
    selectedCube.style.position = 'absolute';
    selectedCube.style.left = `${newX - containerRect.left}px`;
    selectedCube.style.top = `${newY - containerRect.top}px`;
  }
}

// Mouse up event - when the user releases the mouse
function onMouseUp() {
  // Remove mousemove and mouseup event listeners
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);

  // Reset selected cube
  selectedCube = null;
}
