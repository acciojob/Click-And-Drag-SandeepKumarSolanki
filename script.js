// Select all the items in the container
const items = document.querySelectorAll('.item');
const container = document.querySelector('.items');

// Variables to track the item being dragged and mouse offsets
let selectedItem = null;
let offsetX = 0;
let offsetY = 0;

// Adding mouse down event to each item
items.forEach(item => {
  item.addEventListener('mousedown', (e) => {
    selectedItem = item; // Set the selected item
    offsetX = e.clientX - selectedItem.getBoundingClientRect().left; // Calculate offset
    offsetY = e.clientY - selectedItem.getBoundingClientRect().top; // Calculate offset

    // Add event listeners to move the item and drop it
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
});

// Mouse move event: Move the selected item based on mouse position
function onMouseMove(e) {
  if (selectedItem) {
    // Calculate new position of the item
    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;

    // Get the bounding box of the container
    const containerRect = container.getBoundingClientRect();

    // Boundary checks to ensure the item stays inside the container
    if (newX < containerRect.left) newX = containerRect.left;
    if (newY < containerRect.top) newY = containerRect.top;
    if (newX + selectedItem.offsetWidth > containerRect.right) newX = containerRect.right - selectedItem.offsetWidth;
    if (newY + selectedItem.offsetHeight > containerRect.bottom) newY = containerRect.bottom - selectedItem.offsetHeight;

    // Update the position of the selected item
    selectedItem.style.left = `${newX - containerRect.left}px`;
    selectedItem.style.top = `${newY - containerRect.top}px`;
  }
}

// Mouse up event: Finalize the position of the item after dragging
function onMouseUp() {
  // Remove the event listeners
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);

  // Reset selected item
  selectedItem = null;
}
