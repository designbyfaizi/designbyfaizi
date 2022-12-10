export const opened = useState(() => false);

export const openDropdown = () => {
  opened.value = true
}

export const closeDropdown = () => {
  opened.value = false
}