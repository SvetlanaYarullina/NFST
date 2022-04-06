function debounce (cb, ms = 100) {
  let cooldown = false;

  return () => {
    if (cooldown) return;

    cb.apply(this, arguments);

    cooldown = true;

    setTimeout(() => cooldown = false, ms);
  }
}

export {debounce};
