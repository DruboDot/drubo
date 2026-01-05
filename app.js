// ─── Mobile Menu Toggle ───
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu when clicking on a link (for mobile)
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (menuToggle) menuToggle.textContent = '☰';
        });
    });
}

// Close menu when clicking outside (for mobile)
document.addEventListener('click', (e) => {
    if (navMenu && menuToggle && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        menuToggle.textContent = '☰';
    }
});

// ─── Hide/Show paragraph ───
const content = document.getElementById("content");
const change = document.getElementById("change");

if (change && content) {
    change.addEventListener('click', () => {
        content.classList.toggle("hde");
        change.textContent = content.classList.contains("hde") ? "SHOW" : "HIDE";
    });
}

// ─── Counter ───
let count = 0;
const inValue = document.getElementById("inValue");
const minusBtn = document.getElementById("minus");
const plusBtn = document.getElementById("plus");

if (inValue) inValue.value = count;

if (minusBtn) {
    minusBtn.onclick = () => {
        count = Math.max(0, count - 1); // Prevent negative values
        if (inValue) inValue.value = count;
    };
}

if (plusBtn) {
    plusBtn.onclick = () => {
        count++;
        if (inValue) inValue.value = count;
    };
}

// ─── Checkout panel toggle ───
const checkoutBtn = document.getElementById("e");
const checkoutPanel = document.getElementById("checkout-panel");

function toggleCheckout() {
    if (!checkoutPanel) return;
    const willBeOpen = checkoutPanel.classList.contains("hide");
    checkoutPanel.classList.toggle("hide");
    checkoutPanel.classList.toggle("active"); // For mobile slide effect
    if (checkoutBtn) {
        checkoutBtn.classList.toggle("active", willBeOpen);
    }
}

if (checkoutBtn && checkoutPanel) {
    checkoutBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleCheckout();
    });

    // Close checkout when clicking outside
    document.addEventListener("click", (e) => {
        if (!checkoutPanel || !checkoutBtn) return;
        
        const isCheckoutClick = checkoutPanel.contains(e.target) || checkoutBtn.contains(e.target);
        const isMenuClick = navMenu && navMenu.contains(e.target);
        const isMenuToggleClick = menuToggle && menuToggle.contains(e.target);
        
        if (!isCheckoutClick && !isMenuClick && !isMenuToggleClick) {
            if (checkoutPanel.classList.contains("active")) {
                checkoutPanel.classList.remove("active");
                checkoutPanel.classList.add("hide");
                if (checkoutBtn) checkoutBtn.classList.remove("active");
            }
        }
    });

    // Close checkout panel on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && checkoutPanel && checkoutPanel.classList.contains('active')) {
            checkoutPanel.classList.remove('active');
            checkoutPanel.classList.add('hide');
            if (checkoutBtn) checkoutBtn.classList.remove('active');
        }
    });
}

// ─── POST MODAL LOGIC ───
const postBtn = document.getElementById("postBtn");
const postModal = document.getElementById("post-modal");
const postText = document.getElementById("postText");
const submitPost = document.getElementById("submitPost");
const cancelPost = document.getElementById("cancelPost");

function divId(text) {
    return {
        id: Date.now(),
        text: text
    };
}

// Open modal
if (postBtn && postModal) {
    postBtn.addEventListener("click", () => {
        postModal.classList.remove("hide");
        if (postText) postText.focus();
        
        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (menuToggle) menuToggle.textContent = '☰';
        }
    });
}

// Cancel modal
if (cancelPost && postModal) {
    cancelPost.addEventListener("click", () => {
        postModal.classList.add("hide");
        if (postText) postText.value = "";
    });
}

// Submit post
if (submitPost && postText && postModal) {
    submitPost.addEventListener("click", () => {
        const text = postText.value.trim();
        if (!text) {
            // Show error feedback
            postText.style.borderColor = '#ef4444';
            setTimeout(() => {
                postText.style.borderColor = '';
            }, 1000);
            return;
        }

        const main = document.getElementById("main");
        if (!main) return;

        const postDiv = document.createElement("div");
        postDiv.className = "user-post";

        // Mobile-optimized post layout
        postDiv.innerHTML = `
            <div class="post-header">
                <img 
                    src="hadi.jpg" 
                    alt="hadi" 
                    class="post-avatar"
                >
                <div class="post-content">
                    <p>${text}</p>
                    <span class="post-time">Just now</span>
                </div>
            </div>
        `;

        // Create delete button with mobile-friendly styling
        const delBtn = document.createElement("button");
        delBtn.className = "delete-post-btn";
        delBtn.innerHTML = "🗑️ Delete";
        delBtn.setAttribute('aria-label', 'Delete post');

        // Add hover animation for desktop, tap feedback for mobile
        const avatar = postDiv.querySelector('.post-avatar');
        if (avatar) {
            avatar.addEventListener('mouseenter', () => {
                if (window.innerWidth > 768) { // Desktop only
                    avatar.style.transform = 'scale(1.2)';
                }
            });
            
            avatar.addEventListener('mouseleave', () => {
                avatar.style.transform = 'scale(1)';
            });
            
            // Mobile tap effect
            avatar.addEventListener('touchstart', () => {
                avatar.style.transform = 'scale(1.1)';
            });
            
            avatar.addEventListener('touchend', () => {
                setTimeout(() => {
                    avatar.style.transform = 'scale(1)';
                }, 150);
            });
        }

        delBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const postToDelete = e.target.closest('.user-post');
            if (postToDelete) {
                // Add fade-out animation before removal
                postToDelete.style.opacity = '0';
                postToDelete.style.transform = 'translateX(-20px)';
                setTimeout(() => {
                    postToDelete.remove();
                }, 300);
            }
        });

        postDiv.appendChild(delBtn);
        main.prepend(postDiv);

        // Add CSS for the new post if not already in CSS
        const style = document.createElement('style');
        if (!document.querySelector('#post-styles')) {
            style.id = 'post-styles';
            style.textContent = `
                .user-post {
                    background: white;
                    padding: 15px;
                    margin: 15px 0;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
                    transition: all 0.3s ease;
                    border: 1px solid #e5e7eb;
                }
                
                .user-post:hover {
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                }
                
                .post-header {
                    display: flex;
                    gap: 12px;
                    align-items: flex-start;
                }
                
                .post-avatar {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 2px solid #e0e7ff;
                    transition: transform 0.3s ease;
                    flex-shrink: 0;
                }
                
                .post-content {
                    flex: 1;
                }
                
                .post-content p {
                    margin-bottom: 5px;
                    line-height: 1.5;
                }
                
                .post-time {
                    font-size: 0.85rem;
                    color: #6b7280;
                }
                
                .delete-post-btn {
                    margin-top: 10px;
                    padding: 8px 16px;
                    background: #fef2f2;
                    color: #dc2626;
                    border: 1px solid #fecaca;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: all 0.2s ease;
                    width: 100%;
                }
                
                .delete-post-btn:hover {
                    background: #fee2e2;
                }
                
                @media (max-width: 480px) {
                    .post-avatar {
                        width: 50px;
                        height: 50px;
                    }
                    
                    .user-post {
                        padding: 12px;
                        margin: 12px 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Clear and close
        postText.value = "";
        postModal.classList.add("hide");
        
        // Show success feedback on mobile
        if (window.innerWidth <= 768) {
            submitPost.textContent = '✓ Posted!';
            submitPost.style.background = '#10b981';
            setTimeout(() => {
                submitPost.textContent = 'Post';
                submitPost.style.background = '';
            }, 1500);
        }
    });
}

// Close modal on outside click
if (postModal) {
    postModal.addEventListener("click", (e) => {
        if (e.target === postModal) {
            postModal.classList.add("hide");
            if (postText) postText.value = "";
        }
    });
}

// Close modals on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (postModal && !postModal.classList.contains('hide')) {
            postModal.classList.add('hide');
            if (postText) postText.value = "";
        }
        if (checkoutPanel && checkoutPanel.classList.contains('active')) {
            checkoutPanel.classList.remove('active');
            checkoutPanel.classList.add('hide');
            if (checkoutBtn) checkoutBtn.classList.remove('active');
        }
    }
});

// =========== JOKE API ===========
async function getJoke() {
    try {
        const jokeElement = document.getElementById('joke');
        if (!jokeElement) return;
        
        // Show loading state
        jokeElement.innerHTML = '<span style="color:#6b7280">Loading joke... 🤔</span>';
        
        let response = await fetch("https://official-joke-api.appspot.com/random_joke");
        if (!response.ok) throw new Error('Network response was not ok');
        
        let data = await response.json();
        jokeElement.innerHTML = `<strong>${data.setup}</strong><br><em>${data.punchline}</em>`;
        
        // Add animation for joke reveal
        jokeElement.style.opacity = '0';
        setTimeout(() => {
            jokeElement.style.transition = 'opacity 0.5s ease';
            jokeElement.style.opacity = '1';
        }, 10);
        
    } catch (error) {
        console.log("Error fetching joke:", error);
        const jokeElement = document.getElementById('joke');
        if (jokeElement) {
            jokeElement.innerHTML = '<span style="color:#ef4444">Oops! Could not load joke. Try again! 😅</span>';
        }
    }
}

function copyJoke() {
    let jokeElement = document.getElementById('joke');
    let copyBtn = document.getElementById('copyBtn');
    
    if (!jokeElement || !copyBtn) return;
    
    let jokeText = jokeElement.innerText;

    if (jokeText.trim() === "" || jokeText.includes("Loading") || jokeText.includes("Oops!")) {
        copyBtn.innerHTML = "⚠️ No Joke!";
        copyBtn.style.background = '#fbbf24';
        setTimeout(() => {
            copyBtn.innerHTML = "Copy Joke";
            copyBtn.style.background = '';
        }, 2000);
        return;
    }

    navigator.clipboard.writeText(jokeText).then(() => {
        // Success feedback
        copyBtn.innerHTML = "✅ Copied!";
        copyBtn.style.background = '#10b981';
        
        // Haptic feedback for mobile (if supported)
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        
        setTimeout(() => {
            copyBtn.innerHTML = "Copy Joke";
            copyBtn.style.background = '';
        }, 2000);
    }).catch(err => {
        console.log("Failed to copy:", err);
        copyBtn.innerHTML = "❌ Failed!";
        copyBtn.style.background = '#ef4444';
        setTimeout(() => {
            copyBtn.innerHTML = "Copy Joke";
            copyBtn.style.background = '';
        }, 2000);
    });
}

// Initialize joke on page load if needed
document.addEventListener('DOMContentLoaded', () => {
    // You can auto-load a joke on page load if you want:
    // getJoke();
    
    // Add touch event for better mobile interaction
    const jokeButtons = document.querySelectorAll('.joke-btn, #copyBtn');
    jokeButtons.forEach(btn => {
        btn.addEventListener('touchstart', () => {
            btn.style.transform = 'scale(0.98)';
        });
        
        btn.addEventListener('touchend', () => {
            setTimeout(() => {
                btn.style.transform = '';
            }, 150);
        });
    });
});

// Handle window resize for better mobile experience
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on landscape/portrait change
        if (navMenu && window.innerWidth > 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (menuToggle) menuToggle.textContent = '☰';
        }
    }, 250);
});