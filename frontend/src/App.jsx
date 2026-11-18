import { useMemo, useState } from 'react'
import './App.css'

const products = [
  {
    id: 'studio-headphones',
    name: 'Studio Wireless Headphones',
    category: 'Tech',
    price: 89,
    rating: '4.9',
    reviews: 128,
    badge: 'BESTSELLER',
    color: 'sand',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'everyday-sneakers',
    name: 'Everyday Retro Sneakers',
    category: 'Style',
    price: 74,
    rating: '4.8',
    reviews: 96,
    badge: 'JUST IN',
    color: 'blue',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'minimal-watch',
    name: 'The Minimalist Watch',
    category: 'Style',
    price: 120,
    rating: '4.9',
    reviews: 214,
    badge: '',
    color: 'pink',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'instant-camera',
    name: 'Pocket Instant Camera',
    category: 'Tech',
    price: 99,
    rating: '4.7',
    reviews: 73,
    badge: 'FEW LEFT',
    color: 'green',
    image:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'daily-tote',
    name: 'The Daily Carryall',
    category: 'Living',
    price: 58,
    rating: '4.8',
    reviews: 81,
    badge: '',
    color: 'pink',
    image:
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'table-lamp',
    name: 'Soft Glow Table Lamp',
    category: 'Living',
    price: 65,
    rating: '4.6',
    reviews: 52,
    badge: 'JUST IN',
    color: 'sand',
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'smart-speaker',
    name: 'Pebble Smart Speaker',
    category: 'Tech',
    price: 49,
    rating: '4.8',
    reviews: 109,
    badge: '',
    color: 'green',
    image:
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'weekend-sunglasses',
    name: 'Weekend Sunglasses',
    category: 'Style',
    price: 42,
    rating: '4.7',
    reviews: 67,
    badge: '',
    color: 'blue',
    image:
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85',
  },
]

const categories = ['All', 'Style', 'Tech', 'Living']

function Icon({ name, size = 20 }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    bag: <><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    heart: <path d="M20.8 8.8c0 5.2-8.8 10-8.8 10s-8.8-4.8-8.8-10a4.6 4.6 0 0 1 8.8-1.6 4.6 4.6 0 0 1 8.8 1.6Z" />,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    minus: <path d="M5 12h14" />,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />,
    truck: <><path d="M3 6h11v11H3zM14 10h4l3 3v4h-7" /><circle cx="7.5" cy="18" r="1.5" /><circle cx="17.5" cy="18" r="1.5" /></>,
    check: <path d="m5 12 4 4L19 6" />,
  }

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState({})
  const [favorites, setFavorites] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [notice, setNotice] = useState('')

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase()
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === 'All' || product.category === activeCategory
      const matchesSearch =
        !query ||
        `${product.name} ${product.category}`.toLowerCase().includes(query)
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, search])

  const cartItems = products.filter((product) => cart[product.id])
  const itemCount = Object.values(cart).reduce((total, count) => total + count, 0)
  const subtotal = cartItems.reduce(
    (total, product) => total + product.price * cart[product.id],
    0,
  )
  const shipping = subtotal === 0 || subtotal >= 100 ? 0 : 7

  function addToCart(product) {
    setCart((current) => ({
      ...current,
      [product.id]: (current[product.id] || 0) + 1,
    }))
    setNotice(`${product.name} added to your bag`)
    window.setTimeout(() => setNotice(''), 2600)
  }

  function updateQuantity(productId, amount) {
    setCart((current) => {
      const nextQuantity = (current[productId] || 0) + amount
      const nextCart = { ...current }
      if (nextQuantity <= 0) {
        delete nextCart[productId]
      } else {
        nextCart[productId] = nextQuantity
      }
      return nextCart
    })
  }

  function toggleFavorite(productId) {
    setFavorites((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    )
  }

  function handleCheckout() {
    setNotice('Thanks for stopping by! Checkout is a demo.')
    setCartOpen(false)
    window.setTimeout(() => setNotice(''), 3200)
  }

  return (
    <div className="store">
      <div className="announcement">
        <span>GOOD THINGS, ON THEIR WAY</span>
        <span className="announcement-separator">•</span>
        <span>Free shipping on orders over $100</span>
      </div>

      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Goodfinds home">
          goodfinds<span>.</span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#shop">Shop all</a>
          <a href="#shop" onClick={() => setActiveCategory('Style')}>Style</a>
          <a href="#shop" onClick={() => setActiveCategory('Living')}>Home & living</a>
          <a href="#about">Our story</a>
        </nav>
        <div className="header-actions">
          <label className="search-box">
            <Icon name="search" size={18} />
            <input
              aria-label="Search products"
              placeholder="Search good things..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <button
            className="bag-button"
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`Open shopping bag, ${itemCount} items`}
          >
            <Icon name="bag" />
            <span className="bag-label">Bag</span>
            <span className="bag-count">{itemCount}</span>
          </button>
        </div>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> A LITTLE MORE YOU</p>
            <h1>Find your<br />kind of <em>good.</em></h1>
            <p className="hero-description">
              Thoughtful things for everyday life. Picked with care, made to
              make you smile.
            </p>
            <a className="button button-dark" href="#shop">
              Find your favorites <Icon name="arrow" size={18} />
            </a>
            <div className="hero-note">
              <span className="avatar-stack" aria-hidden="true">
                <i>J</i><i>M</i><i>A</i>
              </span>
              <span>Loved by <strong>2,400+</strong> happy humans</span>
            </div>
          </div>
          <div className="hero-art" role="img" aria-label="A thoughtfully curated collection of home and lifestyle goods">
            <div className="hero-sticker">
              <span>THE GOOD<br />STUFF</span>
              <span className="sticker-star">✳</span>
            </div>
            <div className="hero-caption">
              <span>01 / 04</span>
              <span>Little things, big joy.</span>
            </div>
          </div>
          <div className="hero-index">GF — 2025</div>
        </section>

        <section className="benefits" aria-label="Shopping benefits">
          <div><Icon name="truck" size={21} /><span>Free shipping over $100</span></div>
          <span className="benefit-dot">✳</span>
          <div><Icon name="check" size={21} /><span>Thoughtfully picked</span></div>
          <span className="benefit-dot">✳</span>
          <div><Icon name="heart" size={21} /><span>Made for everyday joy</span></div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-line" /> YOUR NEXT FAVORITE</p>
              <h2>Good things, <em>right this way.</em></h2>
            </div>
            <a className="text-link" href="#shop" onClick={() => {
              setActiveCategory('All')
              setSearch('')
            }}>
              Shop everything <Icon name="arrow" size={17} />
            </a>
          </div>

          <div className="shop-toolbar">
            <div className="category-tabs" role="group" aria-label="Filter by category">
              {categories.map((category) => (
                <button
                  className={activeCategory === category ? 'category-tab active' : 'category-tab'}
                  key={category}
                  type="button"
                  aria-pressed={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <span className="product-count">{visibleProducts.length} lovely finds</span>
          </div>

          {visibleProducts.length > 0 ? (
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className={`product-image ${product.color}`}>
                    <img src={product.image} alt={product.name} loading="lazy" />
                    {product.badge && <span className="product-badge">{product.badge}</span>}
                    <button
                      className={favorites.includes(product.id) ? 'favorite-button favorite' : 'favorite-button'}
                      type="button"
                      aria-label={favorites.includes(product.id) ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`}
                      aria-pressed={favorites.includes(product.id)}
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <Icon name="heart" size={19} />
                    </button>
                    <button
                      className="quick-add"
                      type="button"
                      onClick={() => addToCart(product)}
                    >
                      Add to bag <Icon name="plus" size={16} />
                    </button>
                  </div>
                  <div className="product-info">
                    <div className="product-title-row">
                      <h3>{product.name}</h3>
                      <span className="product-price">${product.price}</span>
                    </div>
                    <div className="product-meta">
                      <span>{product.category}</span>
                      <span className="rating"><Icon name="star" size={13} /> {product.rating} <span>({product.reviews})</span></span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-results">
              <span>✳</span>
              <h3>No finds just yet.</h3>
              <p>Try another search or browse everything we picked.</p>
              <button type="button" className="text-link" onClick={() => {
                setSearch('')
                setActiveCategory('All')
              }}>Clear filters <Icon name="arrow" size={17} /></button>
            </div>
          )}

          <div className="shop-footer">
            <span>GOOD THINGS DON&apos;T HAVE TO BE COMPLICATED.</span>
            <a href="#about">A little about us <Icon name="arrow" size={16} /></a>
          </div>
        </section>

        <section className="newsletter" id="about">
          <div className="newsletter-star">✳</div>
          <p className="eyebrow">A NOTE FROM US TO YOU</p>
          <h2>Good mail.<br /><em>Good mood.</em></h2>
          <p>Little updates, new finds, and 10% off your first order.</p>
          <form className="newsletter-form" onSubmit={(event) => {
            event.preventDefault()
            setNotice('You’re on the list. Look out for a little good mail!')
            event.currentTarget.reset()
            window.setTimeout(() => setNotice(''), 3200)
          }}>
            <label className="sr-only" htmlFor="newsletter-email">Your email address</label>
            <input id="newsletter-email" type="email" placeholder="Your email address" required />
            <button type="submit" aria-label="Subscribe to newsletter"><Icon name="arrow" size={20} /></button>
          </form>
          <span className="newsletter-fine-print">No noise, just the good stuff. Unsubscribe anytime.</span>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark" href="#home">goodfinds<span>.</span></a>
        <span>Small joys. Better days.</span>
        <span>© 2026 Goodfinds</span>
      </footer>

      {cartOpen && (
        <div className="cart-layer">
          <button
            className="cart-backdrop"
            type="button"
            aria-label="Close shopping bag"
            onClick={() => setCartOpen(false)}
          />
          <aside className="cart-drawer" aria-label="Shopping bag" aria-modal="true" role="dialog">
            <div className="cart-header">
              <div>
                <p className="eyebrow">YOUR GOOD FINDS</p>
                <h2>Your bag <span>({itemCount})</span></h2>
              </div>
              <button className="icon-button" type="button" aria-label="Close shopping bag" onClick={() => setCartOpen(false)}>
                <Icon name="close" />
              </button>
            </div>
            {cartItems.length > 0 ? (
              <>
                <div className="cart-items">
                  {cartItems.map((product) => (
                    <div className="cart-item" key={product.id}>
                      <img src={product.image} alt="" />
                      <div className="cart-item-info">
                        <h3>{product.name}</h3>
                        <span>${product.price}</span>
                        <div className="quantity-control">
                          <button type="button" aria-label={`Remove one ${product.name}`} onClick={() => updateQuantity(product.id, -1)}><Icon name="minus" size={14} /></button>
                          <span>{cart[product.id]}</span>
                          <button type="button" aria-label={`Add one ${product.name}`} onClick={() => updateQuantity(product.id, 1)}><Icon name="plus" size={14} /></button>
                        </div>
                      </div>
                      <strong>${product.price * cart[product.id]}</strong>
                    </div>
                  ))}
                </div>
                <div className="cart-summary">
                  <p><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></p>
                  <p><span>Shipping</span><strong>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</strong></p>
                  {subtotal > 0 && subtotal < 100 && (
                    <p className="shipping-note">You’re ${(100 - subtotal).toFixed(2)} away from free shipping.</p>
                  )}
                  <button className="button button-dark checkout-button" type="button" onClick={handleCheckout}>
                    Continue to checkout <Icon name="arrow" size={18} />
                  </button>
                  <span className="demo-note">Demo store — no payment will be collected.</span>
                </div>
              </>
            ) : (
              <div className="empty-cart">
                <div className="empty-cart-icon"><Icon name="bag" size={28} /></div>
                <h3>Your bag is taking a little break.</h3>
                <p>Fill it with something good.</p>
                <button className="button button-dark" type="button" onClick={() => {
                  setCartOpen(false)
                  document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
                }}>Explore the good stuff <Icon name="arrow" size={18} /></button>
              </div>
            )}
          </aside>
        </div>
      )}

      {notice && <div className="toast" role="status"><Icon name="check" size={18} /> {notice}</div>}
    </div>
  )
}

export default App
