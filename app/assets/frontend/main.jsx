import TweetBox from './components/TweetBox';
import TweetList from './components/TweetList';

let mockTweets = [
  { id: 1, name: 'Tayyab', body: 'First Tweet' },
  { id: 2, name: 'Tayyab', body: 'First Tweet' },
  { id: 3, name: 'Tayyab', body: 'First Tweet' },
];

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = { tweetsList: mockTweets };
  }

  componentDidMount() {
    $.ajax("/tweets")
      .success(data => this.setState(this.formattedTweets(data)))
      .error(error => console.log(error));
  }

  addTweet(tweetToAdd) {
    $.post("/tweets", { tweet: tweetToAdd })
      .success(savedTweet => {
        let newTweetsList = this.state.tweetsList;
        newTweetsList.unshift(savedTweet);

        this.setState(this.formattedTweets(newTweetsList));
      })
      .error(error => console.log(error));


  }

  formattedTweets(tweetsList) {
    let formattedList = tweetsList.map(tweet => {
      tweet.formattedDate = moment(tweet.created_at).fromNow();
      return tweet;
    });

    return {
      tweetsList: formattedList
    }
  }

  render() {
    return (
      <div class='container'>
        <TweetBox sendTweet={this.addTweet.bind(this)}  />
        <TweetList tweets={this.state.tweetsList} />
      </div>
    );
  }
}

let documentReady = () => {
  let reactNode = document.getElementById('react');
  if (reactNode) {
    ReactDOM.render(<Main />, reactNode);
  }
};

$(documentReady);
