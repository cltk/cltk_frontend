
ReadingBook = React.createClass({

  propTypes: {
    book: React.PropTypes.object.isRequired,
    text: React.PropTypes.object.isRequired
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
      book = this.props.book;
    return (
        <div className="book">
          <div className="title-wrap">
            <h1 className="work-title">{text.title} {book.book_n}</h1>
          </div>

          {this.renderBookChapters()}

        </div>
      );



  }

});
