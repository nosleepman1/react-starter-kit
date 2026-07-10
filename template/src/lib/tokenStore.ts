/**
 * tokenStore — Stockage sécurisé du JWT en mémoire
 *
 * Le token est stocké dans une variable de module, invisible depuis la
 * console du navigateur (contrairement à localStorage). Il n'est pas
 * persisté entre les rechargements de page intentionnellement pour
 * maximiser la sécurité contre les attaques XSS.
 *
 * Pour la persistance de session, on utilise sessionStorage (effacé à la
 * fermeture de l'onglet) plutôt que localStorage (persistant indéfiniment).
 */

const SESSION_KEY = '__rsk_session__'

let _token: string | null = null

/**
 * Initialise le store depuis sessionStorage au premier import du module.
 * Appelé une seule fois au démarrage de l'app.
 */
function init(): void {
  try {
    _token = sessionStorage.getItem(SESSION_KEY)
  } catch {
    // sessionStorage peut être bloqué (mode privé strict, sandboxed iframe)
    _token = null
  }
}

init()

export const tokenStore = {
  /**
   * Stocke le token en mémoire ET dans sessionStorage.
   */
  set(token: string): void {
    _token = token
    try {
      sessionStorage.setItem(SESSION_KEY, token)
    } catch {
      // On continue sans persistance si sessionStorage est bloqué
    }
  },

  /**
   * Retourne le token courant (depuis la mémoire — pas de lecture I/O).
   */
  get(): string | null {
    return _token
  },

  /**
   * Supprime le token de la mémoire et du sessionStorage.
   */
  clear(): void {
    _token = null
    try {
      sessionStorage.removeItem(SESSION_KEY)
    } catch {
      // Silencieux
    }
  },

  /**
   * Indique si un token est actuellement stocké.
   */
  hasToken(): boolean {
    return _token !== null
  },
}
