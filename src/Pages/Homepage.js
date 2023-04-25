import { Link } from "react-router-dom";
import HomeHeader from "../Components/Home/Header/HomeHeader";
import Carousels from "../Components/Home/ComponentShowcase/Carousels";
import OurJourney from "../Components/Home/OurJourney/OurJourney";
import UpcomingComp from "../Components/Home/UpcomingComp/UpcomingComp";
const Home = () => {
    return (
        <div>
            <HomeHeader />

            <div>
                <div>
                    <Carousels />
                </div>

                <div>
                    <UpcomingComp />
                </div>

                <diV>
                    <OurJourney />
                </diV>

                {/* <div style={{ padding: " 5vh 15vw", backgroundColor: "#61dafb", color: "#1e1e2e", fontSize: "22px" }}>
                    We offer a wide range of custom-built components designed to enhance your
                    web development experience. From tables with advanced sorting, filtering , import and export features,
                    to carousels, cards, forms, popups, popovers, and collapse panels, our components are
                    user-centric and easy to customize. Browse our library to take your project
                    to the next level and easily customisable. Just copy, paste our component and use.
                </div> */}

                <h3></h3>
                {/* <h3>Tables</h3> */}

                {/* <p>
          Tables are one of the most commonly used components in dashboard and
          reporting systems. However, designing tables having features such as
          sorting , filtering , Editing , etc can be challenging and
          time-consuming, especially if you want them to look and function the
          way you want.
          <br />
          <br />
          To address this issue, we created simple tables using simple
          JavaScript. We made sure to provide all the code, so developers can
          easily copy and paste the code into their projects and modify it
          according to their needs.
          <br />
          <br />
          Compared to using components from frameworks, these simple tables are
          easier to modify and customize, which can save time and effort for
          developers. With our simple tables, developers can implement their
          logic easily and get the desired results in less time.
          <br />
          <br />
          <ol>
            <li>
              Sorting : - <Link to="/tables#sorting">Go to Sortable Table</Link>
            </li>
            <li>Filtering</li>
            <li>Editing</li>
            <li>Sorting-Editing-Filtering</li>
            <li>Expand</li>
            <li>CRUD with Import Export</li>
          </ol>
        </p> */}
            </div>

            {/* <div>
                <h3>Carousel</h3>

                <p>

                    <ol>
                        <li>Horizontal</li>
                        <li>Vertical</li>
                        <li>Conex curve carousel</li>
                        <li>Concave curve carousel</li>
                    </ol>
                </p>
            </div> */}

            {/* <div>
                <h3>Popups</h3>
                <p>
                    <ol>
                        <li>Info/Form</li>
                        <li>Confirm Popup</li>
                        <li>Conex curve carousel</li>
                    </ol>
                </p>
            </div>
 */}

            {/* <div id="cards">


                <h2>Cards</h2>
                <p>
                    <ol>
                        <li>Profile Card</li>
                        <li>E-commerce Card</li>
                    </ol>
                </p>
            </div> */}

            {/* <div>
                <h2>Collapsible</h2>
                <p>
                    <ol>
                        <li>Collapsible Card</li>
                    </ol>
                </p>
            </div> */}

            {/* <div>
                <h2>Popover</h2>
                <p>
                    <ol>
                        <li>Popover</li>
                    </ol>
                </p>
            </div> */}

            <div>
                {/* <h2>Our Journey</h2> */}
                {/* <p>
          Building a dashboard and reporting system can be a challenging task,
          especially when it comes to designing and creating tables. As a
          developer, I have faced many difficulties while building such systems,
          and I'm sure many of you can relate.
          <br />
          <br />
          The journey from one framework to another can be quite overwhelming,
          as each framework has its own set of features, advantages, and
          disadvantages. Moreover, moving from one framework to another requires
          a lot of effort and increases complexity, making it more challenging
          to work with tables and other react components.
          <br />
          <br />
          I used to struggle with tables, and I realized that I needed to create
          all these components from scratch to make them work seamlessly.
          However, even after building multiple components, I found that they
          lacked the desired aesthetic appeal. While the functionality was
          there, the design was not up to par.
          <br />
          <br />
          This realization made me seek help from my friend, who is a skilled
          designer. I discussed my concerns with him, and he agreed to help me
          with the designing part. Our journey started with brainstorming and
          sketching different table designs that were aesthetically pleasing and
          functional.
          <br />
          <br />
          We started by identifying the core functionalities that a table should
          have, such as sorting, filtering, pagination, and searching. We then
          created a design that was intuitive, responsive, and visually
          appealing.
          <br />
          <br />
          My friend and I collaborated on the project, and we were able to
          create tables and other react components that not only worked
          seamlessly but also looked great. The journey was not easy, but it was
          worth it.
          <br />
          <br />
          After designing various tables, we planned to add commonly used but
          hard to find components to our dashboard and reporting system. These
          components are still in development, and we will add them in the next
          few days..
        </p> */}
            </div>

            <div>
                {/* <h2>Newly Added components</h2>
        <ul>
          <li>Sortable Table</li>
          <li>Filterable Table</li>
          <li>Editable Table</li>
          <li>Expandable Table</li>
          <li>CRUD Import Export</li> */}

                {/* <li>MultiHeader Table</li>
                    <li>MultiSelect Dropdown</li>
                    <li>Diagram</li>
                    <li>Colorpicker</li>
                    <li>Dynamic Form</li> */}
                {/* </ul> */}
            </div>

            {/* <div>
        <h2>Upcoming Components</h2>
        <ul>
          <li>MultiHeader Table</li>
          <li>Carousels</li>
          <li>Collapsible</li>
          <li>Dynamic Navbar</li> */}
            {/* <li>Diagram</li> */}
            {/* <li>Colorpicker</li> */}
            {/* <li>Dynamic Form</li> */}
            {/* </ul>
      </div> */}

        </div>
    );
};

export default Home;
