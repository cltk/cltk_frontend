
ReadingBook = React.createClass({

  propTypes: {
    work: React.PropTypes.object.isRequired,
    book: React.PropTypes.object.isRequired,
    text: React.PropTypes.object.isRequired
  },

  makeChapters() {

  },

  renderBookChapters() {
    return this.props.book.chapters.map((chapter) => {
      return <ReadingChapter
              key={chapter._id}
              chapter={chapter} />

    });

  },
  render() {
    let text = this.props.text,
      work = this.props.work,
      book = this.props.book;
    return (
        <div className="book">
          <div className="title-wrap">
            <h1 className="work-title">{work.title} {book.n}</h1>
          </div>

          {this.renderBookChapters()}

        </div>
      );



  }

});
