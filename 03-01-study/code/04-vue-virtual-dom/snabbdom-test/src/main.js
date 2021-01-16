import { init } from 'snabbdom/build/package/init'
//导入模块
import { styleModule } from 'snabbdom/build/package/modules/style'
import { eventListenersModule } from 'snabbdom/build/package/modules/eventlisteners'
import { classModule } from 'snabbdom/build/package/modules/class'
import { heroModule } from 'snabbdom/build/package/modules/hero'

import { h } from 'snabbdom/build/package/h'

//注册模块
const patch = init([
  classModule,
  heroModule,
  //样式
  styleModule,
  eventListenersModule
])

let originalData = [
  { rank: 1, title: 'The Shawshank Redemption', desc: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', elmHeight: 0 },
  { rank: 2, title: 'The Godfather', desc: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', elmHeight: 0 },
  { rank: 3, title: 'The Godfather: Part II', desc: 'The early life and career of Vito Corleone in 1920s New York is portrayed while his son, Michael, expands and tightens his grip on his crime syndicate stretching from Lake Tahoe, Nevada to pre-revolution 1958 Cuba.', elmHeight: 0 },
  { rank: 4, title: 'The Dark Knight', desc: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.', elmHeight: 0 },
  { rank: 5, title: 'Pulp Fiction', desc: 'The lives of two mob hit men, a boxer, a gangster\'s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', elmHeight: 0 },
  { rank: 6, title: 'Schindler\'s List', desc: 'In Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.', elmHeight: 0 },
  { rank: 7, title: '12 Angry Men', desc: 'A dissenting juror in a murder trial slowly manages to convince the others that the case is not as obviously clear as it seemed in court.', elmHeight: 0 },
  { rank: 8, title: 'The Good, the Bad and the Ugly', desc: 'A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.', elmHeight: 0 },
  { rank: 9, title: 'The Lord of the Rings: The Return of the King', desc: 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.', elmHeight: 0 },
  { rank: 10, title: 'Fight Club', desc: 'An insomniac office worker looking for a way to change his life crosses paths with a devil-may-care soap maker and they form an underground fight club that evolves into something much, much more...', elmHeight: 0 },
]

let data = [
  originalData[0],
  originalData[1],
  originalData[2],
  originalData[3],
  originalData[4],
  originalData[5],
  originalData[6],
  originalData[7],
  originalData[8],
  originalData[9],
]
let vnode = h('div', [
  h('h1', 'Top 10 movies'),
  h('div', [
    'Sort by: ',
    h('span.btn-group', [
      h('a.btn', {
        on: {
          click: () => {
            changeSort('rank')
          }
        }
      }, 'Rank'),
      h('a.btn', {
        on: {
          click: () => {
            changeSort('title')
          }
        }
      }, 'Title'),
      h('a.btn', {
        on: {
          click: () => {
            changeSort('desc')
          }
        }
      }, 'Description')
    ]),
    h('a.btn.add', {
      on: { click: add }
    }, 'Add'),
  ]),
  h('div.list', { style: { height: `${data.length * 98}px` } }, movieView(data))
])
function movieView(data) {
  return data.map((line, index) => h('div.row', {
    style: {
      transform: 'translate(-200px)',
      delayed: { transform: `translateY(${80 * index}px)`, opacity: '1' },
    }
  }, [
    h('div.rank', line.rank),
    h('div.title', line.title),
    h('div.desc', line.desc),
    h('div..btn.rm-btn', { on: { click: () => remove(movie) } }, 'X'),
  ]))
}
function remove(movie) {
  console.log(movie)
}
function add() {
  // 对10以内的随机数取整，获取这10条数据中的任意一条
  let n = originalData[Math.floor(Math.random() * 10)]
  data = [{ rank: data.length++, title: n.title, desc: n.desc, elmHeight: 0 }, ...data]
}
function changeSort(type) {
  console.log(type)
}
let app = document.getElementById("app")
patch(app, vnode)