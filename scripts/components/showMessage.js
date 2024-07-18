export function showMessage(message) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = message;
    messageElement.style.display = "block";
    setTimeout(() => {
      messageElement.style.display = "none";
    }, 5000);
  }