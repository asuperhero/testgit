import React from 'react';
import axios from 'axios';
import { message , Button } from 'antd';
import ReactDOM from 'react-dom';
import ReactSwipe from 'react-swipe';



class App extends React.Component{
  constructor(){
    super();
    this.state={
      res:[{
        bookname:'123',
        bid:1,
        book_info:''
      },{
        bookname:'123',
        bid:2,
        book_info:''

      }],
      resa:[1,2,3,4],
      resb:[5,6,7,8],
      name:'',
      password:'',
      img:'',
    }
  
  }
  componentDidMount(){
    


    // let name = '131';
    // let password = '456';
    // axios.get('https://www.apiopen.top/createUser?key=00d91e8e0cca2b76f515926a36db68f5&phone='+name+'&passwd='+password+'')//注册
    //   .then((res)=>{
    //     console.log(res)
    //   })

  




    // axios.get('https://www.apiopen.top/login?key=00d91e8e0cca2b76f515926a36db68f5&phone=13594347817&passwd=123456')//登陆
    //   .then((res)=>{
    //     console.log(res)
    //   })
 
    // axios.get('https://www.apiopen.top/novelSearchApi?name=盗墓笔记')//搜索小说
    //   .then((res)=>{
    //   console.log(res)
    // })
    // axios.get('https://www.apiopen.top/novelInfoApi?name=盗墓笔记')//小说详情
    //   .then((res)=>{
    //     console.log(res)
    //   })

  }

  land = ()=>{//登陆
    let name = document.getElementById('name').value;
    let password = document.getElementById('password').value;
      axios.get('https://www.apiopen.top/login?key=00d91e8e0cca2b76f515926a36db68f5&phone='+name+'&passwd='+password+'')
      .then((res)=>{
        if(res.data.code === 200){
          message.success(res.data.msg);
          let dad = document.getElementById('dad');
          let footer = document.getElementById('footer');
          let body = document.getElementById('body');
          footer.style.display='block'
          dad.style.display='none';
          body.style.display='block';
          this.setState({
            name:name,
            password:password
          })
        }else{
          message.error(res.data.msg)
        }
      })
  }
  register = ()=>{//注册
    let name = document.getElementById('name').value;
    let password = document.getElementById('password').value;
    axios.get('https://www.apiopen.top/createUser?key=00d91e8e0cca2b76f515926a36db68f5&phone='+name+'&passwd='+password+'')
      .then((res)=>{
        if(res.data.code === 200){
          message.success(res.data.msg);
        }else{
          message.error(res.data.msg)

        }
      })
  }
  componentWillMount(){//推荐小说
    axios.get('https://www.apiopen.top/novelApi')
    .then((res)=>{
      let book = res.data.data
      this.setState({
        res:book
      })
  })
  }
  changebook = ()=>{//推荐小说换一批
    axios.get('https://www.apiopen.top/novelApi')
      .then((res)=>{
        let book = res.data.data
        this.setState({
          res:book
        })
    })
  }
  book = ()=>{ //第一页
       return(
        <div>
        {this.state.res.map((res,id)=>{
          return(
            <div key={id} style={{width:'100%',height:'260px'}}>
              <img style={{width:'50%',float:'left'}} src={res.book_cover} alt={123}/>
              <div style={{width:'50%', float:'left',textAlign:'center'}}>
                <h4>书名：{res.bookname}</h4>
                <p>作者名：{res.author_name}</p>
                <p>分类:{res.class_name}</p>
                <p>更新状态：{res.stat_name}</p>
              </div>
            </div>)
        })}
        <button onClick={this.changebook}>换一批</button>
        <br/>
        <br/>
        <br/>
        </div>
      )

  }
  changeimg = ()=>{
       axios.get('https://www.apiopen.top/novelApi')
          .then((res)=>{
            console.log(res.data.data[0].book_cover)
            let src = res.data.data[0].book_cover
            this.setState({
              img:src
            })
        })
  }
  find = ()=>{ //第二页

    axios.get('https://www.apiopen.top/novelApi')
    .then((res)=>{
      console.log(res.data.data[0].book_cover)
      let src = res.data.data[0].book_cover
      this.setState({
        img:src
      })
  })
    return(
      <div style={{width:'100%'}}>
        <img  style={{width:'100%'}} src={this.state.img} alt='123' onClick={this.changeimg} /><br/>



        <input placeholder='请输入书名' style={{width:'80%',margin:'auto',textAlign:'center'}} id='bookname' />
        <button onClick={this.changeFindBook}>搜索</button>
        <div id='bigfindname'style={{display:'none',textAlign:'center',color:'orange'}}>
          {this.state.resa.map((resa,id)=>{
            return(<div key={id}>{resa}</div>)
          })}
        </div>



        <input placeholder='请输入关键字' style={{width:'80%',margin:'auto',textAlign:'center'}} id='booknameb' />
        <button onClick={this.changeFindBookb}>搜索</button><br/><br/><br/><br/>
        <div id='bigfindnameb'style={{display:'none', textAlign:'center',color:'orange'}}>
          {this.state.resb.map((resb,id)=>{
            return(<div key={id} style={{width:'100%',height:'260px'}}>
            <img style={{width:'50%',float:'left'}} src={resb.cover} alt={123}/>
            <div style={{width:'50%', float:'left',textAlign:'center'}}>
              <h4>书名：{resb.title}</h4>
              <p>作者名：{resb.author}</p>
              <p>分类:{resb.tags}</p>
              <p>字数：{resb.words}</p>
            </div>
          </div>)
          })}
        </div>
      </div>
    )
  }
  me = ()=>{
    return(<div>
      账号：{this.state.name}<br/>
      密码：{this.state.password}<br/>
      <div style={{width:'80%',height:'30px',margin:'auto',background:'red',textAlign:'center',borderRadius:'12px',lineHeight:'30px',color:'white'}} onClick={this.tuichu}>退出登录</div>


    </div>)
  }
  tuichu = ()=>{
    let book = document.getElementById('bookshow');
    let find = document.getElementById('find');
    let me = document.getElementById('me');
    let footer = document.getElementById('foooter')
    let body = document.getElementById('body')
    let dad = document.getElementById('dad')
    book.style.display='none';
    find.style.display='none';
    me.style.display='none';
    body.style.display='none';
    dad.style.display='block';
  }
  changeFindBook=()=>{ //大查找书名
    let name = document.getElementById('bookname').value;
    let bigfindname = document.getElementById('bigfindname')
    bigfindname.style.display='block';
      axios.get('https://www.apiopen.top/novelSearchApi?name='+name+'')//搜索小说
      .then((res)=>{
      
      let resa = res.data.data
      this.setState({
        resa : resa
      })
    })
  }
  changeFindBookb = ()=>{ //小说详情
    let name = document.getElementById('booknameb').value;
    axios.get('https://www.apiopen.top/novelInfoApi?name='+name+'')//小说详情
      .then((res)=>{
      let resb = res.data.data.data
      console.log(resb)
      this.setState({
        resb : resb
      })
    })
    let bigfindnameb = document.getElementById('bigfindnameb');
        bigfindnameb.style.display='block';
  }
  bookshow = ()=>{
    let book = document.getElementById('bookshow');
    let find = document.getElementById('find');
    let me = document.getElementById('me');
    book.style.display='block';
    find.style.display='none';
    me.style.display='none';
  }
  findshow = ()=>{
    let book = document.getElementById('bookshow');
    let find = document.getElementById('find');
    let me = document.getElementById('me');
    book.style.display='none';
    find.style.display='block';
    me.style.display='none';
  }
  meshow = ()=>{
    let book = document.getElementById('bookshow');
    let find = document.getElementById('find');
    let me = document.getElementById('me');
    book.style.display='none';
    find.style.display='none';
    me.style.display='block';
    }

  render(){
    return (<div>
      
        <div id='dad' style={{width:'100%',textAlign:'center' }}>
          <h1 style={{color:'pink'}}>伯镭图书馆</h1>
          <div style={{width:'80%',margin:'auto'}}>
            账号：<input id='name' style={{margin:'auto',width:'60%'}}></input>
          </div>  
          <div style={{width:'80%', margin:'auto'}}>
            密码：<input id='password' type='password' style={{margin:'auto',width:'60%'}}></input>
          </div>  
          <div type="primary" style={{width:'60%',height:'30px',lineHeight:'30px',background:'#388BFF',margin:'auto',marginTop:'10px',borderRadius:'12px'}} onClick={this.land}>登陆</div>
          <div type="primary" style={{width:'60%',height:'30px',lineHeight:'30px',background:'#388BFF',margin:'auto',marginTop:'10px',borderRadius:'12px'}}onClick={this.register}> 注册</div>
      </div>

      <div id='body' style={{display:'none'}}>
        <div id='bookshow'>{this.book()}</div>
        <div id='find'>{this.find()}</div>
        <div id='me' >{this.me()}</div>

      </div>

      <div id='footer' style={{width:'100%',display:'none'}}>
        <div id='one'   style={{width:'33%',height:'40px',position:'fixed',bottom:'0px',left:'0',background:'blue',float:'left',textAlign:'center',lineHeight:'40px'}} onClick={this.bookshow}>推荐</div>
        <div id='two'   style={{width:'33%',height:'40px',position:'fixed',bottom:'0px',left:'33%',background:'blue',float:'left',textAlign:'center',lineHeight:'40px'}}  onClick={this.findshow}>搜索</div>
        <div id='three' style={{width:'33%',height:'40px',position:'fixed',bottom:'0px',left:'66%',background:'blue',float:'left',textAlign:'center',lineHeight:'40px'}} onClick={this.meshow}>个人</div>
      </div>
    </div>)
  }
}
export default App;
