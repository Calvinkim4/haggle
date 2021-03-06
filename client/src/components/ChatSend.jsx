import React from 'react';

class ChatSend extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        chatSend: '' 
    };
  }
  
  onSubmitForm = (event) => {
    event.preventDefault();

    this.setState({ 
        chatSend: '' 
    });

    this.props.onSend(this.state.chatSend);
  }

  onTextChangeForm = (event) => {
    let value = event.target.value;
    this.setState({ 
        chatSend: value
    });
  }

  render() {
    return (
      <div className='chat-send-div'>
        <form onSubmit={this.onSubmitForm}>
          <input className='chat-send-input' type="text" onChange={this.onTextChangeForm} value={this.state.chatSend} placeholder="Message..." required />
        </form>
      </div>
      
    );
  }
}

export default ChatSend;