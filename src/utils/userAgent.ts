export default () => {
    
    const agent = navigator.userAgent
    const isMobile = agent.match(/Android/i) || agent.match(/webOS/i) || agent.match(/iPhone/i) || agent.match(/iPad/i) || agent.match(/iPod/i) || agent.match(/BlackBerry/i)

    return {
        agent,
        isMobile: Boolean(isMobile)
    }
}