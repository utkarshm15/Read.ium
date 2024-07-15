import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Dashboard } from "./pages/Dashboard"
import { CreateBlog } from "./pages/CreateBlog"
import { RecoilRoot } from "recoil"
import { Blog } from "./pages/Blog"
import { Profile } from "./pages/Profile"
import { Edit } from "./pages/Edit"
import { Landing } from "./pages/Landing"

function App() {
  return <RecoilRoot> 
  <BrowserRouter>
    <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/home" element={<Dashboard/>}/>
        <Route path="/create" element={<CreateBlog/>}/>
        <Route path="/blog" element={<Blog></Blog>}/>
        <Route path="/profile" element={<Profile></Profile>}/>
        <Route path="/edit" element={<Edit></Edit>}/>
        <Route path="/" element={<Landing></Landing>}/>
    </Routes>
  </BrowserRouter>
  </RecoilRoot>
}

export default App
