export function copyToClipboard(toCopy: string, message: string = 'Copied to clipboard') {
  const toast = useToast()

  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(toCopy)
      .then(() => {
        toast.add({ title: message, color: 'success', icon: 'i-lucide-check-circle' })
      })
      .catch(() => {
        toast.add({ title: 'Unable to copy link', color: 'error', icon: 'i-lucide-circle-alert' })
      })
    return
  }

  const textArea = document.createElement('textarea')
  textArea.value = toCopy
  textArea.setAttribute('readonly', '')
  textArea.style.position = 'fixed'
  textArea.style.opacity = '0'
  document.body.appendChild(textArea)
  textArea.select()

  try {
    if (!document.execCommand('copy')) {
      throw new Error('Copy command failed')
    }
    toast.add({ title: message, color: 'success', icon: 'i-lucide-check-circle' })
  } catch {
    toast.add({ title: 'Unable to copy link', color: 'error', icon: 'i-lucide-circle-alert' })
  } finally {
    textArea.remove()
  }
}
