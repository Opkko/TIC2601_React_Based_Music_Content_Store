import React from "react";
import { fileURLToPath } from "url";

class fileupload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Success: "",
      AlbumName: "Unknown",
      ArtistName: "Unknown",
      SongName: "Unknown",
      SongPrice: "0",
      AlbumPrice: "19.99"
    };
    this.onSubmitUpload = this.onSubmitUpload.bind(this);
  }

  onAlbumChange = event => {
    this.setState({ AlbumName: event.target.value });
  };

  onArtistChange = event => {
    this.setState({ ArtistName: event.target.value });
  };

  onSongChange = event => {
    this.setState({ SongName: event.target.value });
  };

  onSongPriceChange = event => {
    this.setState({ SongPrice: event.target.value });
  };

  onSubmitUpload(ev) {
    ev.preventDefault();

    const fromData = new FormData();
    fromData.append("file", this.uploadInput.files[0]);
    fromData.append("AlbumName", this.state.AlbumName);
    fromData.append("ArtistName", this.state.ArtistName);
    fromData.append("SongName", this.state.SongName);
    fromData.append("SongPrice", this.state.SongPrice);
    fromData.append("AlbumPrice", this.state.SongPrice);

    fetch("http://localhost:3000/upload", {
      method: "POST",
      body: fromData
    }).then(response => {
      response.json().then(body => {
        this.setState({ Success: "Success" });
      });
    });
  }

  render() {
    const { onRouteChange } = this.props;
    const fileuploadurl = "http://localhost:3000/uploadimg";

    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="Upload" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Upload Song</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6">Album Name :</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black w-100"
                  type="text"
                  name="Album"
                  id="Album"
                  onChange={this.onAlbumChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="Artist">
                  Artist Name :
                </label>
                <input
                  className=" pa2 input-reset ba bg-transparent hover-bg-black w-100"
                  type="text"
                  name="Artist"
                  id="Artist"
                  onChange={this.onArtistChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="Artist">
                  Song Name :
                </label>
                <input
                  className=" pa2 input-reset ba bg-transparent hover-bg-black w-100"
                  type="text"
                  name="Song"
                  id="Song"
                  onChange={this.onSongChange}
                />
              </div>
              <div className="mv3" display="inline-block">
                <label className="db fw6 lh-copy f6" htmlFor="Artist">
                  Song Price :
                </label>
                <input
                  className=" pa2 input-reset ba bg-transparent hover-bg-black w-20"
                  type="text"
                  name="Song"
                  id="Song"
                  onChange={this.onSongPriceChange}
                />
              </div>
              <div className="mv3">
                <label
                  className="db fw6 lh-copy f4"
                  htmlFor="Artist"
                  display="text-align:left"
                >
                  Browse
                </label>
              </div>
            </fieldset>
            <form onSubmit={this.onSubmitUpload}>
              <input
                ref={ref => {
                  this.uploadInput = ref;
                }}
                type="file"
              />
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Upload"
              />
            </form>
            <p>{this.state.Success}</p>
          </div>
        </main>
      </article>
    );
  }
}

export default fileupload;
