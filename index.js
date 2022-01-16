const express = require('express')
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const PORT = process.env.PORT || 80

const ORDERS = []

// app.use(express.json()) // for parsing application/json
// app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/order', (req, res) => {
  res.status(200).end(`
    <div>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/order">Orders</a>
            </li>
          </ul>
        </nav>
      <h1>Orders page</h1>
      <pre>
        ${JSON.stringify(ORDERS, null, 2)}
      </pre>
      </div>
  `)
})

app.post('/order', (req,res) => {
  // console.log(req)
  ORDERS.push(req.body)
  res.status(201).end()
})


app.get('/about', (req, res) => {
  res.end(`
    <div>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/order">Orders</a>
          </li>
        </ul>
      </nav>
    <h1>About page</h1>
    </div>
  `)
})

app.get('/', (req, res) => {
  res.end(`
    <div>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/order">Orders</a>
          </li>
        </ul>
      </nav>
      <h1>Home page</h1>
      <button id="bye">Bye</button>
      <script>
        let bye = document.getElementById("bye")
        bye.style.backgroundColor = "green"
        console.dir(bye)
        bye.addEventListener('click', (e) => {
          order()
        })
        async function order () {
          let answer = await request('/order', 'POST', {pizza: 'luchano', amount: 2})
          console.log('done')
          console.log(answer)
        }
        async function request(url, method = 'GET', data = null) {
          try {
            const headers = {}
            let body

            if (data) {
              headers['Content-Type'] = 'application/json'
              body = JSON.stringify(data)
            }

            const response = await fetch(url, {
              method,
              headers,
              body
            })
            // return await response.json()
            return response
          } catch (e) {
            console.warn('Error:', e.message)
          }
        }
      </script>
    </div>
  `)
})

app.listen(PORT, () => {
  console.log('Server has been started...')
})
