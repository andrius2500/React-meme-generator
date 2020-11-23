import React from 'react';

class MemeGenerator extends React.Component {
    constructor(){
        super()
        this.state = {
            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/1bij.jpg",
            allMemeImages: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    allMemeImages: responseData.data.memes
                })
            })

    }    

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        //getting random index in the array
        const randomNumber = Math.floor(Math.random() * this.state.allMemeImages.length)
        //getting the meme from index
        const randomMemeImage = this.state.allMemeImages[randomNumber].url
        this.setState({
            randomImage: randomMemeImage
        }) 
    }

    render() {
        return (
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        name="topText"
                        placeholder="Top text"
                        value={this.topText}
                        onChange={this.handleChange}
                    />
                    <input 
                        type="text"
                        name="bottomText"
                        placeholder="Bottom text"
                        value={this.bottomText}
                        onChange={this.handleChange}
                    />
                    <button>New meme</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImage} alt="random-meme" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator;