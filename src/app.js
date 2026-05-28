const STORAGE_KEY = 'frutilado-products'

const seedProducts = [
  {
    id: crypto.randomUUID(),
    name: 'Helado artesanal de mora',
    category: 'Helado artesanal',
    price: 6500,
    stock: 24,
    minStock: 8
  },
  {
    id: crypto.randomUUID(),
    name: 'Malteada de vainilla',
    category: 'Malteada',
    price: 9000,
    stock: 16,
    minStock: 5
  },
  {
    id: crypto.randomUUID(),
    name: 'Brownie con helado',
    category: 'Postre',
    price: 11000,
    stock: 10,
    minStock: 4
  }
]

const emptyProductForm = () => ({
  name: '',
  category: 'Helado artesanal',
  price: 0,
  stock: 0,
  minStock: 0
})

const loadStoredProducts = () => {
  const storedProducts = localStorage.getItem(STORAGE_KEY)
  return storedProducts ? JSON.parse(storedProducts) : seedProducts
}

Vue.createApp({
  data() {
    return {
      products: loadStoredProducts(),
      productForm: emptyProductForm(),
      editingProductId: null,
      invoiceProductId: '',
      invoiceQuantity: 1,
      invoice: {
        customer: '',
        items: []
      },
      message: ''
    }
  },

  computed: {
    inventoryValue() {
      return this.products.reduce((total, product) => total + product.price * product.stock, 0)
    },

    lowStockProducts() {
      return this.products.filter((product) => product.stock <= product.minStock)
    },

    invoiceTotal() {
      return this.invoice.items.reduce((total, item) => total + item.subtotal, 0)
    }
  },

  methods: {
    persistProducts() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.products))
    },

    currency(value) {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0
      }).format(value)
    },

    saveProduct() {
      const product = {
        ...this.productForm,
        price: Number(this.productForm.price),
        stock: Number(this.productForm.stock),
        minStock: Number(this.productForm.minStock)
      }

      // Si existe un producto en edición, se conserva su identificador para evitar duplicados.
      if (this.editingProductId) {
        this.products = this.products.map((item) =>
          item.id === this.editingProductId ? { ...product, id: this.editingProductId } : item
        )
      } else {
        this.products.push({ ...product, id: crypto.randomUUID() })
      }

      this.persistProducts()
      this.resetProductForm()
      this.message = 'Producto guardado correctamente.'
    },

    editProduct(product) {
      this.productForm = { ...product }
      this.editingProductId = product.id
    },

    removeProduct(productId) {
      this.products = this.products.filter((product) => product.id !== productId)
      this.persistProducts()
      this.message = 'Producto eliminado del inventario.'
    },

    resetProductForm() {
      this.productForm = emptyProductForm()
      this.editingProductId = null
    },

    addItemToInvoice() {
      const product = this.products.find((item) => item.id === this.invoiceProductId)

      if (!product) {
        this.message = 'Seleccione un producto válido.'
        return
      }

      if (this.invoiceQuantity > product.stock) {
        this.message = 'La cantidad solicitada supera las existencias disponibles.'
        return
      }

      const existingItem = this.invoice.items.find((item) => item.productId === product.id)
      const subtotal = product.price * this.invoiceQuantity

      // El ítem se acumula si el producto ya fue agregado a la factura.
      if (existingItem) {
        existingItem.quantity += this.invoiceQuantity
        existingItem.subtotal += subtotal
      } else {
        this.invoice.items.push({
          productId: product.id,
          name: product.name,
          quantity: this.invoiceQuantity,
          subtotal
        })
      }

      this.invoiceProductId = ''
      this.invoiceQuantity = 1
      this.message = 'Producto agregado a la factura.'
    },

    registerSale() {
      this.invoice.items.forEach((item) => {
        const product = this.products.find((storedProduct) => storedProduct.id === item.productId)
        if (product) {
          product.stock -= item.quantity
        }
      })

      this.persistProducts()
      this.clearInvoice()
      this.message = 'Venta registrada y existencias actualizadas.'
    },

    clearInvoice() {
      this.invoice = {
        customer: '',
        items: []
      }
      this.invoiceProductId = ''
      this.invoiceQuantity = 1
    }
  }
}).mount('#app')
