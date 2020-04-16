import Sortable from 'sortablejs'
import Rails from '@rails/ujs'
import { Controller } from 'stimulus'

export default class extends Controller {

  initialize() {
    this.sortable = Sortable.create(this.element, {
      animation: 150,
      onEnd: this.dragend.bind(this),
    })
  }

  dragend(event) {
    const ids = this.sortable.toArray()
    const form = document.getElementById('row-order-form')
    document.getElementById('row_order').value = ids
    Rails.fire(form, 'submit')
  }

  onPostError(event) {
    Turbolinks.visit('/books', 'replace')
  }
}
