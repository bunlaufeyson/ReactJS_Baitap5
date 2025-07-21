import Header from "./header";
import Navbar from "./navbar";
import Content from "./content";
import Footer from "./footer";

function Baitap1() {
  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        <Navbar />
        <Content />
      </div>
      <Footer />
    </div>
  );
}

export default Baitap1;
