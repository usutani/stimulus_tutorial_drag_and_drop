import Rails from '@rails/ujs'
import { Controller } from 'stimulus'

export default class extends Controller {

  get dragKey() {
    return 'application/drag-key'
  }

  dragstart(event) {
    // console.log('dragstart')

    const bookId = event.target.getAttribute('data-book-id')
    event.dataTransfer.setData(this.dragKey, bookId)
    event.dataTransfer.effectAllowed = 'move'
  }

  // drag(event) {
  //   console.log('drag')
  // }

  // dragenter(event) {
  //   console.log('dragenter')
  // }

  // dragleave(event) {
  //   console.log('dragleave')
  // }

  dragover(event) {
    // console.log('dragover')

    event.preventDefault()
  }

  drop(event) {
    // console.log('drop')

    const srcId = event.dataTransfer.getData(this.dragKey)
    const src = this.element.querySelector(`[data-book-id='${srcId}']`);
    const dst = event.target
    const pos = dst.compareDocumentPosition(src)

    if (pos & src.DOCUMENT_POSITION_PRECEDING) {
      event.target.insertAdjacentElement('afterend', src);
    } else if (pos & src.DOCUMENT_POSITION_FOLLOWING) {
      event.target.insertAdjacentElement('beforebegin', src);
    }
    event.preventDefault()
  }

  dragend(event) {
    const nodes = this.element.querySelectorAll('[data-book-id]')
    const ids = Array.from(nodes).map(el => el.getAttribute('data-book-id'))
    const obj = { row_order: ids }
    const body = JSON.stringify(obj)
    const token = document.getElementsByName('csrf-token')[0].content
    const headers = {
      'X-CSRF-Token': token,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
    fetch('/books/row_order', {
      method: 'PATCH',
      // credentials: 'same-origin',
      headers: headers,
      body: body,
    })
    .then(response => {
      if (!response.ok) {
        Turbolinks.visit('/books', 'replace')
      }
    })
  }
}
