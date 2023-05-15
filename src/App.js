import React, { useState, createRef, useEffect } from 'react';
import './style.scss';
import { LikeIcon, ReplyIcon, RetweetIcon, ShareIcon, VerifiedIcon } from './icons';
import { AvatarLoader } from './loaders';
import { useScreenshot } from 'use-react-screenshot';

const tweetFormat = tweet => {
  tweet = tweet
    .replace(/@([\w]+)/g, '<span>@$1</span>')
    .replace(/#([\wşçöğüıİ]+)/gi, '<span>#$1</span>')
    .replace(/(https?:\/\/[\w\.\-\/]+)/, '<span>$1</span>');
  return tweet;
};

const formatNumber = number => {
      if (!number) {
        number = 0;
      }

      if (number < 0) {
        number = 0;
      }
  
      if (number < 1000) {
          return number;
      }
          number /= 1000;
          number = String(number).split('.');
          return (
              number[0] + (number[1] > 100 ? ',' + number[1].slice(0, 1) + ' B' : ' B')
          );  
      
};

function App() {
  const tweetRef = createRef(null);
  const downloadRef = createRef();
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [isVerified, setIsVerified] = useState(false);
  const [tweet, setTweet] = useState();
  const [avatar, setAvatar] = useState();
  const [retweets, setRetweets] = useState();
  const [quoteTweets, setQuoteTweets] = useState();
  const [likes, setLikes] = useState();
  const [image, takeScreenshot] = useScreenshot();
  const getImage = () => takeScreenshot(tweetRef.current);

  useEffect (() => {
    if (image) {
      downloadRef.current.click();
    }
  }, [image]);


  const avatarHandle = (e) => {
   const file = e.target.files[0]
   const reader = new FileReader()
    reader.addEventListener('load', function() {
      setAvatar(this.result);
    });      
   reader.readAsDataURL(file);
  };

  return (
    <>
      <div className='tweet-settings'>
        <h3><b>Tweet Settings </b></h3> 
        <ul>
          <li>
            <label>Name Surname</label>
            <input
              type='text'
              className='input'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </li>
          <li>
            <label>Username</label>
            <input
              type='text'
              className='input'
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </li>
          <li className='verified'>
            <label>Verified Account</label>
            <input
              type='checkbox'
              defaultValue={isVerified}
              onChange={(e) => setIsVerified(e.target.checked)}
            />
          </li>
          <li>
            <label>Tweet</label>
            <textarea
              className='textarea'
              maxLength="290"
              value={tweet}
              onChange={e => setTweet(e.target.value)}
            />
          </li>
          <li>
            <label>Avatar</label>
            <input
              type='file'
              className='input'
              onChange={avatarHandle}
            />
          </li>
          <li>
            <label>Retweets</label>
            <input
              type='number'
              className='input'
              value={retweets}
              onChange={e => setRetweets(e.target.value)}
            />
          </li>
          <li>
            <label>Quotes</label>
            <input
              type='number'
              className='input'
              value={quoteTweets}
              onChange={e => setQuoteTweets(e.target.value)}
            />
          </li>
          <li>
            <label>Likes</label>
            <input
              type='number'
              className='input'
              value={likes}
              onChange={e => setLikes(e.target.value)}
            />
          </li>
          <button onClick={getImage}>Create</button>
          <div className='download-url'>
           {image && (<a ref={downloadRef} href={image} download="tweet.png">
              Tweeti İndir
            </a>)} 
          </div>
        </ul>
      </div>
      <div className='tweet-container'>
          <div className="tweet" ref={tweetRef}>
          <div className='tweet-author'>
          {avatar && <img src= {avatar} /> || <AvatarLoader /> }
            <div>
              <div className='name'>
                {name || 'Name Surname'}
                {isVerified && <VerifiedIcon width="19" height="19" />}
              </div>
              <div className='username'>@{username || 'username'}</div>
            </div>
          </div>
          <div className='tweet-content'>
            <p dangerouslySetInnerHTML={{
              __html:
                (tweet && tweetFormat(tweet)) || 'Please write your tweet!'
            }}>
              { }</p>
          </div>
          <div className='tweet-stats'>
            <span>
              <b>{formatNumber(retweets)}</b> Retweet
            </span>
            <span>
              <b>{formatNumber(quoteTweets)}</b> Quotes
            </span>
            <span>
              <b>{formatNumber(likes)}</b> Likes
            </span>
          </div>
          <div className='tweet-actions'>
            <span>
              <ReplyIcon />
            </span>
            <span>
              <RetweetIcon />
            </span>
            <span>
              <LikeIcon />
            </span>
            <span>
              <ShareIcon />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
