import React from "react";
import {theme} from "../theme";
import img from "../img.jpg";
import {Counter} from "./counter";

export function App() {
    const [clicked, setClicked] = React.useState(false);

    return <div className="container">
        <sp-theme theme="spectrum" color={theme} scale="medium" dir="ltr">
            <sp-heading size="L">
                {clicked ? 'Hello there!' : 'React Boilerplate Plugin'}
            </sp-heading>
            <sp-card heading="Spectrum Web Component Integration" subheading="Card's working"
                     onClick={() => setClicked((clicked => !clicked))}>
                <img slot="cover-photo"
                     src={img}
                     alt="Demo Image"/>
            </sp-card>
            <Counter/>
        </sp-theme>
    </div>;
}